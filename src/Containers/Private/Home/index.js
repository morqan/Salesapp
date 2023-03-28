import React, { useCallback, useEffect, useState } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { navigate } from '@/Navigators/utils'
import {
  useLazyGetImagesQuery,
  useLazyGetPagesQuery,
  useLazyGetPositionQuery,
} from '@/Services/modules/Auth'
import { useDispatch } from 'react-redux'
import {
  setDownloaded,
  setHomeItemPosition,
  setLocalImgUrls,
  setPages,
} from '@/Store/Auth'
import { useAuth } from '@/Hooks/useAuth'
import SvgGenerator from '@/Components/SvgGenerator'
import * as RNFS from 'react-native-fs'
import MyHeader from '@/Components/MyHeader'
import HomeFooter from '@/Components/HomeFooter'
import { hfStyles } from '@/Components/HomeFooter/index.style'
import { Config } from '@/Config'

export default function Home() {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const [homeImg, setHomeImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloadedImg, setDownloadedImg] = useState(0)
  const { localImagesUrls, homeItemPositions, pages, downloaded } = useAuth()

  const dispatch = useDispatch()

  const [getImages, result] = useLazyGetImagesQuery()
  const { data: getImagesData } = result
  const onDownloadImages = async imgUrls => {
    try {
      const FILE = Platform.OS === 'ios' ? '' : 'file://'
      const imgLocalUrls = []
      for (let i = 0; i < imgUrls?.length; i++) {
        const sourceUrl = imgUrls[i]
        const decodedUrl = decodeURIComponent(sourceUrl) // decode URL-encoded characters
        const lastSlashIndex = decodedUrl.lastIndexOf('/')
        const lastDotIndex = decodedUrl.lastIndexOf('.')
        const imgName = decodedUrl
          .slice(lastSlashIndex + 1, lastDotIndex)
          .trim()
          .split(' ')
          .pop()

        const fileName = `${FILE}${RNFS.DocumentDirectoryPath}/img${imgName}${i}.jpg`
        const exists = await RNFS.exists(fileName)
        if (exists) {
          console.log(fileName, 'old')
          imgLocalUrls.push({
            id: sourceUrl,
            localUrl: fileName,
            imgName: `img${imgName}${i}.jpg`,
          })
          setDownloadedImg(prevState => prevState + 1)
        } else {
          const download = RNFS.downloadFile({
            fromUrl: sourceUrl,
            toFile: fileName,
          })
          const downloadResult = await download.promise
          if (downloadResult.statusCode === 200) {
            console.log(fileName, 'new')
            imgLocalUrls.push({
              id: sourceUrl,
              localUrl: fileName,
              imgName: `img${imgName}${i}.jpg`,
            })
            setDownloadedImg(prevState => prevState + 1)
          }
        }
      }
      dispatch(setLocalImgUrls({ localUrls: imgLocalUrls }))
      dispatch(setDownloaded({ download: true }))
    } catch (err) {
      console.log(err, 'down err')
    } finally {
      setLoading(false)
      setDownloadedImg(0)
    }
  }


  const [getPosition, { data, isSuccess, isError, error }] =
    useLazyGetPositionQuery()

  const [
    getPage,
    { data: getPageData, isSuccess: getPageIsSuccess, isError: getPageIsError },
  ] = useLazyGetPagesQuery()

  useEffect(() => {
    if (!homeItemPositions.length) {
      getPosition()
    }
    if (!pages) {
      getPage()
    }
    if (localImagesUrls?.length < 525) {
      getImages().unwrap()
    }
  }, [
    getImages,
    getPage,
    getPosition,
    homeItemPositions.length,
    localImagesUrls?.length,
    pages,
  ])
  // console.log(getImagesData.filter(x => x === 'https://app-portonovi.gocreative.az/storage/app/media/project/marina%20residences.jpg'), 'getImagesData')
  useEffect(() => {
    if (getPageIsSuccess) {
      // console.log(getPageData, 'getPageData')
      dispatch(setPages({ page: getPageData }))
    }
  }, [getPageIsSuccess, getPageIsError, dispatch, getPageData])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setHomeItemPosition({ itemPosition: data?.data }))
    }
    if (isError) {
      console.log(error, 'getPosition error')
    }
  }, [isSuccess, isError, dispatch, data?.data, error])

  useEffect(() => {
    if (pages && localImagesUrls.length > 525) {
      const image = `${Config.IMG_PATH}${pages?.index?.img}`
      setHomeImg(image)
      localImagesUrls.filter(x => {
        if (x?.id === image) {
          Image.getSize(x?.localUrl, (width, height) => {
            setHeights(height)
            setWidths(width)
          })
        }
      })
    }
    if (getPageIsError) {
      console.log(error, 'getPosition error')
    }
  }, [getPageIsSuccess, getPageIsError, pages, localImagesUrls, error])

  const onOpenProject = useCallback(item => {
    console.log(item, 'item')
    navigate('Project', { project: item })
  }, [])

  const onOpenDownloadImages = useCallback(() => {
    setLoading(true)
    const loadData = async () => {
      await Promise.all([
        getImages().unwrap(),
        getPosition().unwrap(),
        getPage().unwrap(),
      ]).then(res => {
        console.log(res, 'res')
        dispatch(setPages({ page: res[2] }))
        dispatch(setHomeItemPosition({ itemPosition: res[1]?.data }))
        onDownloadImages(res[0])
      })
    }
    loadData()
  }, [dispatch, getImages, getPage, getPosition])

  const onGoPortonoviGallery = useCallback(() => {
    navigate('Gallery', {
      gallery: pages?.portonovi?.gallery,
      params: pages?.portonovi,
    })
  }, [pages?.portonovi])
  if (loading) {
    return (
      <View style={homeStyles.spinnerBox}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ fontSize: 20 }}>
          Image size: {getImagesData?.length}{' '}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Downloaded image count: {downloadedImg}{' '}
        </Text>
      </View>
    )
  }
  return (
    <View style={homeStyles.container}>
      <MyHeader onDownloadImages={onOpenDownloadImages} />
      {(downloaded && getImagesData?.length > 0) ||
      (downloaded && localImagesUrls?.length > 525) ? (
        <View>
          {pages && widths && (
            <SvgGenerator
              img={homeImg}
              path={homeItemPositions}
              onPress={onOpenProject}
              height={heights}
              width={widths}
              top={2600}
              backgroundColor={'#1F6B6B'}
            />
          )}
        </View>
      ) : (
        <View style={homeStyles.downloadHint}>
          <Text style={homeStyles.downloadHintText}>
            Please click button for downloading application data.
          </Text>
          <Text style={homeStyles.downloadHintText}>
            Please note that it might take 5-10 minutes based on your internet
            connection.
          </Text>
          <TouchableOpacity
            onPress={onOpenDownloadImages}
            style={homeStyles.downloadBtn}
          >
            <Text style={homeStyles.downloadBtnText}>Download</Text>
          </TouchableOpacity>
        </View>
      )}
      <HomeFooter homeItems={homeItemPositions} onPress={onOpenProject} />
      <View style={homeStyles.footerGallery}>
        <ScrollView horizontal={true}>
          {pages?.portonovi?.gallery.map(imgUrl => {
            let newImg = `${Config.IMG_PATH}${imgUrl?.img}`.replaceAll(
              ' ',
              '%20',
            )
            return (
              <TouchableOpacity
                onPress={onGoPortonoviGallery}
                activeOpacity={0.95}
                key={newImg}
              >
                <Image
                  source={{
                    uri: newImg,
                  }}
                  style={hfStyles.img}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

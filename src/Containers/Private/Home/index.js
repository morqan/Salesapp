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
import gallery from '../../../Assets/Images/footerGallery.jpg'
import footerGallery from '../../../Assets/Images/footerGallery1.jpg'
import footerGallery1 from '../../../Assets/Images/footerGallery2.jpg'
import footerGallery2 from '../../../Assets/Images/footerGallery3.jpg'
import footerGallery3 from '../../../Assets/Images/footerGallery4.jpeg'
import footerGallery4 from '../../../Assets/Images/footerGallery5.jpg'
import footerGallery5 from '../../../Assets/Images/footerGallery6.jpg'
import footerGallery6 from '../../../Assets/Images/footerGallery7.jpg'
import footerGallery7 from '../../../Assets/Images/footerGallery8.jpg'
import footerGallery8 from '../../../Assets/Images/footerGallery9.jpg'
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
    let imgLocalUrls = []
    try {
      const FILE = Platform.OS === 'ios' ? '' : 'file://'
      for (let i = 0; i < imgUrls?.length; ) {
        let fileName = FILE + RNFS.DocumentDirectoryPath + '/' + `img${i}.jpg`
        let sourceUrl = imgUrls[i]
        if (await RNFS.exists(fileName)) {
          // await RNFS.unlink(fileName)
          const newPath = {
            id: sourceUrl,
            localUrl: fileName,
            imgName: `img${i}.jpg`,
          }
          console.log(imgLocalUrls.length, 'oldPath')
          setDownloadedImg(prevState => prevState + 1)
          imgLocalUrls.push(newPath)
          i++
        } else {
          const download = RNFS.downloadFile({
            fromUrl: sourceUrl,
            toFile: fileName,
          })
          const downloadResult = await download.promise
          console.log(sourceUrl, 'imgLocalUrls.length')
          console.log(downloadResult, 'downloadResult')

          if (downloadResult.statusCode === 200) {
            const newPath = {
              id: sourceUrl,
              localUrl: fileName,
              imgName: `img${i}.jpg`,
            }
            console.log(imgLocalUrls.length, 'newPath')
            setDownloadedImg(prevState => prevState + 1)
            imgLocalUrls.push(newPath)
            i++
          }
        }
      }
    } catch (err) {
      console.log(err, 'down err')
    } finally {
      dispatch(setLocalImgUrls({ localUrls: imgLocalUrls }))
      dispatch(setDownloaded({ download: true }))
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
  console.log(pages, 'pagess')
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
        <ScrollView contentContainerStyle={homeStyles.downloadHint}>
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
        </ScrollView>
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

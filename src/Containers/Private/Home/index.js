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
import Footer from '@/Components/Footer'
import SvgGenerator from '@/Components/SvgGenerator'
import * as RNFS from 'react-native-fs'
import logo from '../../../Assets/Images/logo.png'
import MainBtnGroup from '@/Components/MainBtnGroup'
import downloadIcon from '../../../Assets/Images/akar-icons_download.png'

export default function Home() {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const [homeImg, setHomeImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloadedImg, setDownloadedImg] = useState(0)
  const { localImagesUrls } = useAuth()

  const dispatch = useDispatch()
  const { homeItemPositions, pages, downloaded } = useAuth()

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
      getImages()
        .unwrap()
        .then(res => {
          console.log(res, 'getImages')
        })
    }
  }, [])

  useEffect(() => {
    if (getPageIsSuccess) {
      // console.log(getPageData, 'getPageData')
      dispatch(setPages({ page: getPageData }))
    }
  }, [getPageIsSuccess, getPageIsError])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setHomeItemPosition({ itemPosition: data?.data }))
    }
    if (isError) {
      console.log(error, 'getPosition error')
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (pages && localImagesUrls.length > 525) {
      const image = `https://app-portonovi-test.gocreative.az/storage/app/media${pages?.index?.img}`
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
  }, [getPageIsSuccess, getPageIsError, pages, localImagesUrls])

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
        onDownloadImages(res[0])
      })
    }
    loadData()
  }, [])

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
      <View style={homeStyles.logoBox}>
        <Image source={logo} style={homeStyles.logo} />
      </View>
      {(downloaded && getImagesData?.length > 0) ||
      (downloaded && localImagesUrls?.length > 525) ? (
        <View>
          {(pages) && widths && (
            <SvgGenerator
              img={homeImg}
              path={homeItemPositions}
              onPress={onOpenProject}
              height={heights}
              width={widths}
              top={2600}
            />
          )}
          <Footer
            lifestyle={pages?.lifestyle}
            montenegro={pages?.montenegro}
            portonovi={pages?.portonovi}
          />
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
      <MainBtnGroup />
      <TouchableOpacity
        onPress={onOpenDownloadImages}
        style={homeStyles.downloadBtnLittle}
      >
        <Image source={downloadIcon} style={homeStyles.downloadIcon} />
      </TouchableOpacity>
    </View>
  )
}

import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, Image, Platform, ActivityIndicator } from 'react-native'
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

export default function Home() {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloadedImg, setDownloadedImg] = useState(0)

  const dispatch = useDispatch()
  const { homeItemPositions, pages, localImagesUrls, downloaded } = useAuth()
  // console.log(downloaded, 'downloaded')

  const [getImages, result] = useLazyGetImagesQuery()
  const {
    data: getImagesData,
    isSuccess: getImagesIsSuccess,
    isError: getImagesIsError,
  } = result
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
      console.log(imgLocalUrls, 'imgLocalUrls')
      dispatch(setLocalImgUrls({ localUrls: imgLocalUrls }))
      // dispatch(setDownloaded({ download: true }))
      setLoading(false)
    }
  }
  useEffect(() => {
    if (localImagesUrls?.length !== getImagesData?.length) {
      setLoading(true)
      onDownloadImages(getImagesData)
    }
  }, [getImagesIsSuccess])

  const [getPosition, { data, isSuccess, isError, error }] =
    useLazyGetPositionQuery()

  const [
    getPage,
    { data: getPageData, isSuccess: getPageIsSuccess, isError: getPageIsError },
  ] = useLazyGetPagesQuery()
  const image = {
    uri: `https://app-portonovi-test.gocreative.az/storage/app/media${pages?.data?.viewBag?.img}`,
  }

  useEffect(() => {
    if (!homeItemPositions.length) {
      getPosition()
    }
    if (!pages) {
      getPage()
    }
    // if (localImagesUrls?.length) {
    getImages()
      .unwrap()
      .then(res => {
        console.log(res, 'getImages')
      })
    // }
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
    if (getPageIsSuccess || pages) {
      Image.getSize(image?.uri, (width, height) => {
        setHeights(height)
        setWidths(width)
      })
    }
    if (getPageIsError) {
      console.log(error, 'getPosition error')
    }
  }, [getPageIsSuccess, getPageIsError, pages])

  const onOpenProject = useCallback(item => {
    navigate('Project', { project: item })
  }, [])
  // console.log(pages, 'pages')
  // console.log(homeItemPositions, 'homeItemPositions')
  // console.log(getImagesData?.length, 'getImagesData?.length')
  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Image size: {getImagesData?.length} </Text>
        <Text>Downloaded image count: {downloadedImg} </Text>
      </View>
    )
  }
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.logoBox}>
        <Image source={logo} style={homeStyles.logo} />
      </View>
      {(getPageIsSuccess || pages) && widths && (
        <SvgGenerator
          img={image?.uri}
          path={homeItemPositions}
          onPress={onOpenProject}
          height={heights}
          width={widths}
          top={2600}
        />
      )}
      <Footer homeFooter={pages?.data?.viewBag?.footer_menu} />
      <MainBtnGroup />
    </View>
  )
}

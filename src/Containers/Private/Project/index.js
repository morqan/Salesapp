import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import SvgGenerator from '@/Components/SvgGenerator'
import { navigate, navigationRef } from '@/Navigators/utils'
import MyBtn from '@/Components/MyBtn'
import { homeStyles } from '@/Containers/Private/Home/Iindex.style'
import { projectStyles } from '@/Containers/Private/Project/index.style'
import Footer from '@/Components/Footer'
import BackBtn from "@/Components/BackBtn"

export default function Project(props) {
  const [widths, setWidths] = useState('')
  const [heights, setHeights] = useState('')
  const {
    img,
    items,
    catalog,
    gallery,
    information,
    video,
    pyc,
    name,
    pyc_gallery,
  } = props?.route?.params?.project

  const onOpenDetails = useCallback(item => {
    navigate('Details', { detail: item })
  }, [])

  useEffect(() => {
    Image.getSize(img, (width, height) => {
      setHeights(height)
      setWidths(width)
    })
    console.log(props?.route?.params?.project, 'props?.route?.params?.project')
  }, [])
  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  return (
    <View style={projectStyles.container}>
      <View style={projectStyles.absoluteHead}>
        <BackBtn onPress={goBack} />
      </View>
      {widths && (
        <SvgGenerator
          img={img}
          path={items?.data}
          onPress={item => onOpenDetails(item)}
          width={widths}
          height={heights}
          top={1600}
          backgroundColor="#0d6a78"
        />
      )}
      <Footer
        catalog={catalog}
        gallery={gallery}
        information={information}
        video={video}
        pyc={pyc}
        name={name}
        pyc_gallery={pyc_gallery}
      />
    </View>
  )
}

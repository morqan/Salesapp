import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { navigationRef } from '@/Navigators/utils'
import RenderHtml from 'react-native-render-html'
import { planStyles } from '@/Containers/Private/Plan/index.style'
import { useAuth } from '@/Hooks/useAuth'
import BackBtn from '@/Components/BackBtn'
import letterImg from '../../../Assets/Images/mail.png'
import MainBtnGroup from '@/Components/MainBtnGroup'
import MailSendModal from '@/Components/MailSendModal'
import { useOnSendMailMutation } from '@/Services/modules/Auth'
import SuccessModal from '@/Components/SuccessModal'
import Pinchable from 'react-native-pinchable'
import MyHeader from '@/Components/MyHeader'
import LeftMenu from '@/Components/LeftMenu'
import { detailsStyles } from '@/Containers/Private/Details/index.style'

export default function Plan(props) {
  const { width } = useWindowDimensions()
  const { localImagesUrls, user } = useAuth()
  const { gallery, name, info, is_reserved, is_sold, id, project } =
    props?.route?.params?.plan
  const [headInfo, setHeadInfo] = useState([])
  const [localImgs, setLocalImgs] = useState([])
  const [mailModal, setMailModal] = useState(false)
  const [mail, setMail] = useState('')
  const [successPopup, setSuccessPopup] = useState(false)

  const [sendMail, { data, isSuccess, isError, error }] =
    useOnSendMailMutation()

  const goBack = useCallback(() => {
    navigationRef.goBack()
  }, [])

  const setMailHandler = useCallback(() => {
    setMailModal(prevState => !prevState)
  }, [])

  const setSuccessPopupHandler = useCallback(() => {
    setSuccessPopup(prevState => !prevState)
  }, [])

  const onChangeMailValue = useCallback(value => {
    setMail(value)
  }, [])

  const onSendMail = useCallback(() => {
    const body = {
      user_id: user?.id,
      email: mail,
      id: id,
    }
    console.log(body, 'body')
    sendMail(body).unwrap()
  }, [mail])

  useEffect(() => {
    if (isSuccess) {
      setMailHandler()
      setSuccessPopupHandler()
      setMail('')
    }
  }, [isSuccess, isError])

  useEffect(() => {
    const infoHead = info.map(item => {
      return {
        html: `${item?.content}`,
      }
    })
    setHeadInfo(infoHead)
  }, [])

  useEffect(() => {
    const newGallery = gallery.map(item => {
      let newImg =
        `https://app-portonovi-test.gocreative.az/storage/app/media${item?.img}`.replaceAll(
          ' ',
          '%20',
        )
      return newImg
    })
    const localGallery = localImagesUrls.filter(i => newGallery.includes(i?.id))

    setLocalImgs(localGallery)
  }, [])
  console.log(props?.route?.params?.plan, 'props?.route?.params?.plan')
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyHeader goBack={goBack} />
      <View style={planStyles.backBtnBox}>
        <TouchableOpacity onPress={setMailHandler}>
          <Image source={letterImg} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: '90%', flexDirection: 'row' }}>
        <LeftMenu
          title={name}
          project={project}
          name={name}
          headInfo={headInfo}
        />
        <View style={detailsStyles.sliderBox}>
          <Carousel
            loop={false}
            width={ width * 0.75}
            data={localImgs}
            scrollAnimationDuration={3000}
            renderItem={({ index, item }) => {
              return (
                <View>
                  <Pinchable style={planStyles.slideBox}>
                    <Image
                      style={planStyles.sliderImg}
                      source={{
                        uri: item?.localUrl,
                      }}
                    />
                  </Pinchable>
                </View>
              )
            }}
          />
        </View>
      </View>
      {is_reserved !== 0 ||
        (is_sold !== 0 && (
          <View style={planStyles.sliderAbsoluteBox}>
            <Text style={planStyles.sliderAbsoluteText}>
              {is_sold !== 0 && 'Sold out'}
              {is_reserved !== 0 && 'Reserved'}
            </Text>
          </View>
        ))}
      {mailModal && (
        <MailSendModal
          onPressCancel={setMailHandler}
          value={mail}
          onChangeText={onChangeMailValue}
          onPressSend={onSendMail}
        />
      )}
      {successPopup && <SuccessModal onPress={setSuccessPopupHandler} />}
    </View>
  )
}

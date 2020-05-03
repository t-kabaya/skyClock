import React, { Component, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  UIManager,
  LayoutAnimation,
  Dimensions
} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Font from 'expo-font'
import Moment from 'moment'
import { useKeepAwake } from 'expo-keep-awake';
import AnimatedGradientTransition from './AnimatedGradientTransition'
import grads from './skyColor'

const { height, width } = Dimensions.get('window')
const maxWidth = height > width ? height : width
// 回転を止めて欲しい？
// ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const interval = __DEV__ ? 1000 : 1

export default () => {
  useKeepAwake()

  const [calculating, setCalculating] = useState(true)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState('')
  const [backgroundSkyColor, setBackgroundSkyColor] = useState(grads[0])
  const moment = Moment()

  useEffect(() => {
    setInterval(() => {
      const hour = parseInt(moment.format('H'))
      const minute =
        moment.format('m').length === 1
          ? '0' + moment.format('m')
          : moment.format('m')
      LayoutAnimation.easeInEaseOut()
      moment.add(interval, 'seconds')
      setHour(hour)
      setMinute(minute)
      setCalculating(false)
      setBackgroundSkyColor(grads[hour * 4 + Math.floor(minute / 15)])
    }, 1000)

    Font.loadAsync({
      'text-me-one': require('./TextMeOne-Regular.ttf')
    })
  },[])

    if (calculating) return null
    const firstNum = hour.toString()[hour.toString().length - 2]
    const secondNum = hour.toString()[hour.toString().length - 1]
    const thirdNum = minute.toString()[0]
    const forthNum = minute.toString()[1]
    return (
      <View style={S.container}>
        <AnimatedGradientTransition
          colors={backgroundSkyColor}
          style={{
            padding: 15,
            alignItems: 'center',
            borderRadius: 5,
            width: maxWidth,
            height: height
          }}
        >
          <View style={S.gradientContainer}>
            <StatusBar style={{ backgroundColor: 'transparent' }} />
            <Text style={[S.timeText, { paddingRight: 260 }]}>
              {firstNum}
            </Text>
            <Text style={[S.timeText, { paddingRight: 110 }]}>
              {secondNum}
            </Text>
            <Text style={S.timeText}>:</Text>
            <Text style={[S.timeText, { paddingLeft: 110 }]}>
              {thirdNum}
            </Text>
            <Text style={[S.timeText, { paddingLeft: 260 }]}>
              {forthNum}
            </Text>
          </View>
        </AnimatedGradientTransition>

        {/* <KeepAwake /> */}
      </View>
    )
  
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  timeText: {
    color: 'white',
    fontSize: 130,
    position: 'absolute',
    fontFamily: 'text-me-one'
  }
})

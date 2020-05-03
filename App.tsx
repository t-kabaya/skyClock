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
import { KeepAwake } from 'expo'
import * as ScreenOrientation from 'expo-screen-orientation';
import AnimatedGradientTransition from './AnimatedGradientTransition'
import * as Font from 'expo-font'
import Moment from 'moment'
import grads from './gradationColor'

const { height, width } = Dimensions.get('window')
const maxWidth = height > width ? height : width
// 回転を止めて欲しい？
// ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const interval = 1

export default () => {
  // const [moment, setMoment] = useState(moment())
  const [calculating, setCalculating] = useState(true)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [backgroundSkyColor, setBackgroundSkyColor] = useState(grads[0])
  const moment = Moment()

  useEffect(() => {
    setInterval(() => {
      let hour = parseInt(moment.format('H'))
      let minute =
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

// 以下のURLを参考にした
// https://github.com/react-native-community/react-native-linear-gradient/pull/314/commits/22bffd5b842cba73d59e62820bc465fe81d5cfcc
// 色のグラデーションは以下から
// https://codepen.io/justgooddesign/pen/ougtB

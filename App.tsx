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

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

StatusBar.setHidden(true)

const interval = __DEV__ ? 1000 : 1

export default () => {
  const [calculating, setCalculating] = useState(true)
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [backgroundColor, setBackgroundColor] = useState(grads[0])
  
  useKeepAwake()

  const moment = Moment()

  useEffect(() => {
    setInterval(() => {
      const hour: string = moment.format('H')
      const minute: string =
        moment.format('m').length === 1
          ? '0' + moment.format('m')
          : moment.format('m')

      LayoutAnimation.easeInEaseOut()

      moment.add(interval, 'seconds')

      setHour(hour)
      setMinute(minute)
      setBackgroundColor(grads[parseInt(hour) * 4 + Math.floor(parseInt(minute) / 15)])
      setCalculating(false)
    }, 1000)

    Font.loadAsync({'text-me-one': require('./TextMeOne-Regular.ttf')})
  },[])

  if (calculating) return null
  const firstNum = hour[hour.length - 2]
  const secondNum = hour[hour.length - 1]
  const thirdNum = minute[0]
  const forthNum = minute[1]
  return (
    <View style={S.container}>
      <AnimatedGradientTransition
        colors={backgroundColor}
        style={S.animatedGradientTransition}
      >
        <View style={S.gradientContainer}>
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
  },
  animatedGradientTransition: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    width: maxWidth,
    height: height
  }
})

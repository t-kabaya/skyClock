import React, { Component } from 'react'
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
import moment from 'moment'
import grads from './gradationColor'

const { height, width } = Dimensions.get('window')
const maxWidth = height > width ? height : width
// 回転を止めて欲しい？
// ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const interval = 1

class App extends Component {
  state = {
    moment: moment(),
    calculating: true
  }

  // 15分毎に色を変える
  componentDidMount = async () => {
    setInterval(() => {
      const moment = this.state.moment
      let hour = parseInt(moment.format('H'))
      let minute =
        moment.format('m').length === 1
          ? '0' + moment.format('m')
          : moment.format('m')
      LayoutAnimation.easeInEaseOut()
      // 通常はmoment.add(1, 'seconds')
      moment.add(interval, 'seconds')

      this.setState({
        hour: hour,
        minute: minute,
        calculating: false,
        // 15分毎　= １時間　＊ ４ + minutes / 15
        backgroundSkyColor: grads[hour * 4 + Math.floor(minute / 15)]
      })
    }, 1000)

    Font.loadAsync({
      'text-me-one': require('./TextMeOne-Regular.ttf')
    })
  }

  // render() {
  //   return <Text>lol</Text>
  // }

  render () {
    const { hour, minute, backgroundSkyColor, calculating } = this.state
    if (calculating) return null
    const firstNum = hour.toString()[hour.toString().length - 2]
    const secondNum = hour.toString()[hour.toString().length - 1]
    const thirdNum = minute.toString()[0]
    const forthNum = minute.toString()[1]
    return (
      <View style={styles.container}>
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
          <View style={styles.gradientContainer}>
            <StatusBar style={{ backgroundColor: 'transparent' }} />
            <Text style={[styles.timeText, { paddingRight: 260 }]}>
              {firstNum}
            </Text>
            <Text style={[styles.timeText, { paddingRight: 110 }]}>
              {secondNum}
            </Text>
            <Text style={styles.timeText}>:</Text>
            <Text style={[styles.timeText, { paddingLeft: 110 }]}>
              {thirdNum}
            </Text>
            <Text style={[styles.timeText, { paddingLeft: 260 }]}>
              {forthNum}
            </Text>
          </View>
        </AnimatedGradientTransition>

        {/* <KeepAwake /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

// 色のマッピングは田端さんが考え中
// 画面の横対応だけやっておく。
// fontの色は白

//  計２時間でここまでのものが出来る　Expo最高

export default App

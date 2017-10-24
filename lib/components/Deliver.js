import React from 'react'
import QRCode from 'react-native-qrcode'
import { Content } from 'native-base'

export default class Deliver extends React.Component {
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    return (
      <Content contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
        }}
      >
        <QRCode
          value={'http://maphubs.com'}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      </Content>
    )
  }
}

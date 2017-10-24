//@flow
import React from 'react'
import { Image } from 'react-native';
import { Card, CardItem, Body, Left, Text } from 'native-base'

type Props = {
  latitude: number,
  longitude: number,
  image: string
}

export default class StopCard extends React.Component<Props> {
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  
  render(){
    return (
      <Card>
        <CardItem>
          <Left>                 
            <Body>
              <Text>Cocoa Pickup</Text>
              <Text note>Latitude: {this.props.latitude}</Text>
              <Text note>Longitude: {this.props.longitude}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: this.props.image}} style={{height: 300, width: null, flex: 1}}/>
        </CardItem>
      </Card>
    )
  }
}
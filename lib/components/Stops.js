//@flow
import React from 'react'

import { Content } from 'native-base'

import StopCard from './StopCard'

type Props = {
  stops: Array<{latitude: number, longitude: number, image: string}>
}

export default class Stops extends React.Component<Props> {
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    return (
      <Content>
        {this.props.stops.map((stop)=>{
          return(
            <StopCard key={stop.id}
              latitude={stop.latitude}
              longitude={stop.longitude}
              image={stop.image}
            />
          )
        })}
      </Content>
    )
  }
}

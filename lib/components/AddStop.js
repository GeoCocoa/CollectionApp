//@flow
import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { ImagePicker } from 'expo'
import { Card, CardItem, Toast, Content, Button, Icon, Text, Badge, Left, Body, Right } from 'native-base';

import StopCard from './StopCard'

import shortid from 'shortid'



export default class AddStop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      image: null
    }
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  save = () => {

    this.setState({image: null})
    if(this.props.onSave){
      this.props.onSave({
        id: shortid(),
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        image: this.state.image
      })
    }
  }

  render(){
    let { image } = this.state;
    if(image){
      return (
      <Content>
        <StopCard 
          image={this.state.image} 
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
        <Body>
          <Button primary block onPress={this.save}><Text> Save </Text></Button> 
        </Body>
      </Content>
      )
    }else{
      return (
        <Content contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center', 
          alignSelf: "center",
          alignItems: 'center' }}>

          <Button primary iconLeft large onPress={this._pickImage}>
          <Icon name='camera' />
          <Text> Take Photo </Text>
         
          </Button>  
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </Content>
      )
    }
  }

}
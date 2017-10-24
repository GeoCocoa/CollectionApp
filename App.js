import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Card, CardItem, Toast, Root, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge, Left, Body, Right } from 'native-base';
import AddStop from './lib/components/AddStop'
import Deliver from './lib/components/Deliver'
import Stops from './lib/components/Stops'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'add',
      error: null,
      stops: [],
    };
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentWillUnmount() {
   
  }

  selectTab = (tab) => {
    this.setState({selectedTab: tab})
  }

  save = (stop) => {
    let stops = this.state.stops
    stops.push(stop)
    this.setState({stops})
    Toast.show({
      text: 'Saved!',
      position: 'bottom',
      buttonText: 'Okay'
    })
  }

  render() {
    let { image, selectedTab } = this.state;

    let content
    if(selectedTab === 'add'){
      content = (
        <AddStop onSave={this.save} />
      )
    }else if(selectedTab === 'deliver'){
      content = (
        <Deliver />
      )
    }else if(selectedTab === 'stops'){
      content = (
        <Stops stops={this.state.stops} />
      )
    }else{
      content = (
        <Content>
           <Text>Coming Soon!</Text>
        </Content>
       
      )
    }
    
    return (
      <Root>
      <Container>
        <Header />
        {content}
        <Footer>
          <FooterTab>
            <Button 
              onPress={()=>{this.selectTab('stops')}}
              active={this.state.selectedTab == 'stops'} badge vertical>
              <Badge><Text>{this.state.stops.length}</Text></Badge>
              <Icon active={this.state.selectedTab == 'stops'} name="list" />
              <Text>Stops</Text>
            </Button>
            <Button 
              onPress={()=>{this.selectTab('add')}}
              active={this.state.selectedTab == 'add'} vertical>
              <Icon active={this.state.selectedTab == 'add'} name="add" />
              <Text>New Stop</Text>
            </Button>
            <Button 
              onPress={()=>{this.selectTab('deliver')}}
              active={this.state.selectedTab == 'deliver'} vertical>
              <Icon active={this.state.selectedTab == 'deliver'} name="barcode" />
              <Text>Deliver</Text>
            </Button>
            <Button 
              onPress={()=>{this.selectTab('settings')}}
              active={this.state.selectedTab == 'settings'} vertical>
              <Icon active={this.state.selectedTab == 'settings'} name="settings" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

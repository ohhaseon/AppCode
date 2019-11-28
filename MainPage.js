import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Foundation } from "@expo/vector-icons";
import { IconButton, Colors } from 'react-native-paper';
import {
  createAppContainer,
  DrawerItems,
  navigationOptions,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Geocoder from 'react-native-geocoding';

import CameraPage from './CameraPage';
import RecordPage from './RecordPage';
import SearchPage from './SearchPage';
import HelpModal from './HelpModal_main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#AAABD3',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  Bcontainer: {
    backgroundColor: 'white',
    flex: 17,
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  header:{
    flex: 1,
    fontSize: 33,
    textAlign: 'center', 
    marginTop: 35,
    color: '#353866',
  },
  CameraStyle:{
    flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fffff',
  borderWidth: .5,
  borderColor: '#AAABD3',
  height: 80,
  width: 316,
  borderRadius: 5 ,
  margin: 20,
  },
  cameraIcon:{
    color:'#00000',
    left: 58,
    top:-3,
  },
  CameraTextStyle:{
    left: 70,
    fontSize: 22,
    color: '#353866',
    lineHeight: 22,
    top: 4,
  },
  SearchStyle:{
    flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fffff',
  borderWidth: .5,
  borderColor: '#AAABD3',
  height: 115,
  width: 153,
  borderRadius: 5 ,
  margin: 20,
  marginTop: -8,
  },
  SearchIcon:{
    color:'#00000',
    left: 42,
    top: -8,
    
  },
  SearchTextStyle:{
    left: -45,
    fontSize: 13,
    color: '#353866',
    top: 38,
  },
  RecordStyle:{
    flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fffff',
  borderWidth: .5,
  borderColor: '#AAABD3',
  height: 115,
  width: 150,
  borderRadius: 5 ,
  margin: 10,
  marginTop: -8,
  left : 177,
  top: -126,
  },
  RecordIcon:{
    color:'#00000',
    left: 50,
    top: -8,
    
  },
  RecordTextStyle:{
    left: -34,
    fontSize: 13,
    color: '#353866',
    top: 38,
  },
  MMungu:{
    color:'#F78181',
    fontSize: 22,
    top: -85,
    left: 20,
  },
  Mungu: {
    color: '#353866',
    textAlign: 'center', 
    fontSize: 18,
    top: -80,
  },
  HelpIcon:{
    color: '#CBA6C3',
    left: 285,
    bottom: 10,
  }
});


class Home extends Component {
  constructor(props){
    super(props);
    this._onPressHelp = this._onPressHelp.bind(this);
  }
  _onPressHelp(){
    //alert("Help Page");
    this.refs.helpModal.showHelpModal();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>모안화실</Text>
      <SafeAreaView style={styles.Bcontainer}>
        
        
        <TouchableOpacity style={styles.CameraStyle} activeOpacity={0.5} onPress={()=>{this.props.navigation.navigate("CameraPage");}}> 
 
         <Ionicons name="ios-camera" style={styles.cameraIcon} size={90} />
 
         <Text style={styles.CameraTextStyle}>  CAMERA {"\n"}DETECTOR</Text>
 
       </TouchableOpacity>
 
        <TouchableOpacity style={styles.SearchStyle} activeOpacity={0.5} onPress={()=>{this.props.navigation.navigate("SearchPage");}}> 
 
         <Ionicons name="ios-search" style={styles.SearchIcon} size={88} />
 
         <Text style={styles.SearchTextStyle}>SAFE RESTROOM</Text>
 
       </TouchableOpacity>

       <TouchableOpacity style={styles.RecordStyle} activeOpacity={0.5} onPress={()=>{this.props.navigation.navigate("RecordPage");}}> 
 
         <Foundation name="clipboard-pencil" style={styles.RecordIcon} size={77} />
 
         <Text style={styles.RecordTextStyle}>WRITE RECORD</Text>
 
       </TouchableOpacity>
       <Text style={styles.MMungu} >불법촬영은,</Text>
       <Text style={styles.Mungu}>성폭력특례법에 의해 5년이하의 징역 또는 {"\n"}1000만원이하의 벌금형에 처해집니다.</Text>
       <TouchableOpacity
        onPress={this._onPressHelp}>
        <Ionicons name="ios-help-circle-outline" style={styles.HelpIcon} size={70} />
       </TouchableOpacity>
      </SafeAreaView> 
      <HelpModal ref={'helpModal'} parentFlatList={this}> </HelpModal>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  CameraPage: {
    screen : CameraPage,
    navigationOptions: {
      header: null,
    },
  },
  SearchPage: {
    screen : SearchPage,
    navigationOptions: {
      header: null,
    },
  },
  RecordPage : {
    screen: RecordPage,
    navigationOptions: {
      header: null,
    },
  }
  
});

export default createAppContainer(AppNavigator);
import React, { Component } from 'react';
import { Text, View, Image, Alert, Dimensions, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

var screen = Dimensions.get('window');
export default class HelpModal extends Component {
  constructor(props) {
    super(props);
  }
  showHelpModal = () => {
    this.refs.mainHelp.open();
  };
  render() {
    return (
      <Modal
        ref={'mainHelp'}
        style={{
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30 : 0,
          shadowRadius: 7,
          width: screen.width - 80,
          height: 400,
        }}
        position="center"
        backdrop={true}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: -20,
          }}>
          Information
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
          }}>
          ■ 촬영 방법: 적외선 필터가 휴대폰 후레쉬(손전등 빛)와 카메라 렌즈를 모두 커버하도록 해주세요 
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 30,
          }}>
          ■ 필름 구매 안내 및 자세한 촬영 방법, 기록 방법은 'monouns블로그'를 참고해 주세요
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 30,
          }}>
          ■ 블로그 주소: (https://blog.naver.com/PostList.nhn?blogId=szh1109&parentCategoryNo=25)
        </Text>
      </Modal>
    );
  }
}

import React from 'react';
import { Text, View, TouchableOpacity, Image, CameraRoll } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default class CameraPage extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  snap = () => {
    if (this.camera) {
      this.camera.takePictureAsync( {onPictureSaved: this.onPictureSaved} );
    }
  };

  onPictureSaved = async photo => {
    let path = `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`;
    await FileSystem.moveAsync({
      from: photo.uri,
      to: path,
    });
    this.setState({ path: path });
    CameraRoll.saveToCameraRoll(path,'photo');
  };

  async componentDidMount() {
    try {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}photos`,
        {
          intermediates: true,
        }
      );
    } catch (e) {
      console.log(e);
    }
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            ref={ref => {
              this.camera = ref;
            }}
            type={this.state.type}>
            <View style={{height: 70, backgroundColor: 'transparent', alignItems: 'center', marginTop: 30}}>
            <Text style={{fontSize: 15, color: 'white'}}>몰래 카메라 렌즈에서 반사되어 나타나는 흰 점을 찾으세요. </Text>
            <Text style={{fontSize: 15, color: 'white'}}>흰 점은 크기가 매우 작을 수도 있습니다. </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
            />
            <View
              style={{
                //flex: 1,
                height: 70,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                //alignItems: 'flex-end',
                //justifyContent: 'flex-end'
              }}>
              <TouchableOpacity
                style={{
                  //flex: 0.1,
                  //alignSelf: 'flex-start',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 3,
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 25, marginBottom: 10, color: 'white' }}>
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  marginLeft: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.snap}
              />
            </View>
          </Camera>
        </View>
      );
    }
  }
}

import React, { Component } from 'react';
import {
  DatePickerIOS,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions, Platform
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { DrawerNavigator } from 'react-navigation';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, Foundation } from '@expo/vector-icons';

import firebase from 'firebase';
var config = {
  apiKey: 'AIzaSyBFGleFLxgnhUahU6LYlDpvuV22szEaVeE',
  authDomain: 'project1-79c85.firebaseapp.com',
  databaseURL: 'https://project1-79c85.firebaseio.com',
  projectId: 'project1-79c85',
  storageBucket: 'project1-79c85.appspot.com',
  messagingSenderId: '1021320138247',
  appId: '1:1021320138247:web:f0bb2d40ee10f17640e4a2',
  measurementId: 'G-D3N4R2ERKY',
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

var screen = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedStartDate: null,
      chosenDate: new Date(),
      modalVisible2: false,
      modalVisible3: true,
      buttonColorA: '#CBA6C3',
      buttonColorB: '#CBA6C3',
      floor: '',
      toilet: '',
      camera: null,
      detail_loc: '',
      textValue: 'Press Me!',
      textValue2: 'Press Me!',
      latitude: 0,
      longitude: 0,
      address: 'Get Address',
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.setDate = this.setDate.bind(this);
    this.storeToiletInfo = this.storeToiletInfo.bind(this);
  }

  storeToiletInfo(location, floor, toilet, camera, date, time, detail_loc) {
    var pushref = firebase
      .database()
      .ref('ToiletLocation/' + location)
      .push({ floor, toilet, camera, date, time, detail_loc }, function(error) {
        if (
          location == 'Get Address' ||
          location == '' ||
          floor == '' ||
          camera == '' ||
          date == ''
        ) {
          alert('Error: Input is wrong.');
          firebase
            .database()
            .ref('ToiletLocation/' + location)
            .child(pushref.key)
            .remove();
        } else if (error) {
          alert('Error:', error);
          firebase
            .database()
            .ref('ToiletLocation/' + location)
            .child(pushref.key)
            .remove();
        } else {
          alert('Suceed!');
        }
      });
    this.setState({
      modalVisible: false,
      selectedStartDate: null,
      chosenDate: new Date(),
      modalVisible2: false,
      buttonColorA: '#CBA6C3',
      buttonColorB: '#CBA6C3',
      floor: '',
      toilet: '',
      camera: null,
      detail_loc: '',
      textValue: 'Press Me!',
      textValue2: 'Press Me!',
      latitude: 0,
      longitude: 0,
      address: 'Get Address',
    });
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  openModal2() {
    this.setState({
      modalVisible2: true,
    });
  }

  closeModal2() {
    this.setState({ modalVisible2: false });
  }

  openModal3() {
    this.setState({ modalVisible3: true });
  }

  closeModal3() {
    this.setState({ modalVisible3: false });
  }

  getData() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000 }
    );
    Geocoder.init('AIzaSyAFAB6JvhLZ2q3mtUvkiqw893SOdWmeS7I', {
      language: 'ko',
    });
    Geocoder.from(
      parseFloat(this.state.latitude),
      parseFloat(this.state.longitude)
    )
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        this.setState({ address: addressComponent });
      })
      .catch(error => console.warn(error));
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate
      ? moment(selectedStartDate).format('YYYY-MM-DD')
      : '';

    const { chosenDate } = this.state;
    const chosenTime = chosenDate ? moment(chosenDate).format('h:mm a') : '';

    const { floor } = this.state;
    const floornum = floor ? floor.toString() : '';

    const { toilet } = this.state;
    const toiletnum = toilet ? toilet.toString() : '';

    const { camera } = this.state;
    const cam = camera ? camera : '';

    const { detail_loc } = this.state;
    const detail_loc1 = detail_loc ? detail_loc.toString() : '';

    const { address } = this.state;
    const location = address ? address.toString() : '';

    return (
      <View style={styles.container}>
        <View style={styles.header} />

        <View style={styles.content}>
          <View style={styles.firstView}>
            <Text style={styles.head}>WRITE RECORD</Text>
            
            <TouchableOpacity onPress={()=>this.openModal3()}>
              <Ionicons
                name="ios-help-circle-outline"
                style={styles.HelpIcon}
                size={50}
              />
            </TouchableOpacity>
           
          </View>

          <View style={styles.secondView}>
            <View style={styles.element}>
              <View style={styles.dot} />
              <View style={styles.profile}>
                <Text style={styles.prof}>LOCATION</Text>
              </View>
              <View style={styles.input}>
                <TouchableOpacity
                  onPress={() => {
                    this.getData();
                  }}>
                  <Text style={{ fontSize: 20, color: 'black' }}>
                    {this.state.address}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.element}>
              <View style={styles.detail}>
                <View style={styles.dot} />
                <View style={styles.profile}>
                  <Text style={styles.prof}>상세 위치</Text>
                </View>
                <View style={styles.blank_} />
                <View style={styles.input_}>
                  <TextInput
                    style={styles.detail_loc}
                    onChangeText={text => this.setState({ detail_loc: text })}
                    value={this.state.detail_loc}
                    placeholder="Enter Text.."
                    placeholderTextColor="gray"
                  />
                </View>
              </View>
            </View>

            <View style={styles.element}>
              <View style={styles.dot} />
              <View style={styles.profile}>
                <Text style={styles.prof}>NUMBER</Text>
              </View>
              <View style={styles.blank} />
              <View style={styles.input}>
                <TextInput
                  style={styles.input_num}
                  onChangeText={text => this.setState({ floor: text })}
                  value={this.state.floor}
                  placeholder="#"
                  placeholderTextColor="gray"
                />
                <Text style={styles.word}> FLOOR</Text>
                <View style={styles.blank} />
                <TextInput
                  style={styles.input_num}
                  onChangeText={text => this.setState({ toilet: text })}
                  value={this.state.toilet}
                  placeholder="#"
                  placeholderTextColor="gray"
                />
                <Text style={styles.word}> TOILET</Text>
              </View>
              <View style={styles.blank} />
            </View>

            <View style={styles.element}>
              <View style={styles.dot} />
              <View style={styles.profile}>
                <Text style={styles.prof}>CAMERA</Text>
              </View>
              <View style={styles.blank} />
              <View style={styles.button}>
                <View
                  style={styles.buttonRight}
                  backgroundColor={this.state.buttonColorA}>
                  <TouchableOpacity
                    style={styles.buttonA}
                    onPress={() =>
                      this.setState({
                        camera: 'yes',
                        buttonColorA: '#E2E2E2',
                        buttonColorB: '#CBA6C3',
                      })
                    }>
                    <Text>YES</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.line} />
                <View
                  style={styles.buttonLeft}
                  backgroundColor={this.state.buttonColorB}>
                  <TouchableOpacity
                    style={styles.buttonA}
                    onPress={() =>
                      this.setState({
                        camera: 'no',
                        buttonColorB: '#E2E2E2',
                        buttonColorA: '#CBA6C3',
                      })
                    }>
                    <Text>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.blank} />
            </View>

            <View style={styles.element}>
              <View style={styles.dot} />
              <View style={styles.profile}>
                <Text style={styles.prof}>DATE</Text>
              </View>
              <View style={styles.blank} />
              <View style={styles.input}>
                <View style={styles.input_date}>
                  <Button
                    onPress={() => this.openModal()}
                    title={this.state.textValue}
                    color="gray"
                  />
                </View>
                <Text style={styles.word}> DAY</Text>
              </View>
              <View style={styles.blank} />
            </View>

            <View style={styles.element_time}>
              <View style={styles.dot_time} />
              <View style={styles.blank_time} />
              <View style={styles.blank} />
              <View style={styles.input}>
                <View style={styles.input_date}>
                  <Button
                    onPress={() => this.openModal2()}
                    title={this.state.textValue2}
                    color="gray"
                  />
                </View>
                <Text style={styles.word}> TIME</Text>
              </View>
              <View style={styles.blank_} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonB}>
            <Button
              onPress={() =>
                this.storeToiletInfo(
                  location,
                  floornum,
                  toiletnum,
                  cam,
                  startDate,
                  chosenTime,
                  detail_loc1
                )
              }
              title="UPDATE"
              color="black"
            />
          </View>
        </View>

        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => this.closeModal()}>
          <View style={styles.modalContainer}>
            <View style={styles.modal_blank}>
              <Button
                onPress={() => this.closeModal()}
                title=" CLOSE "
                color="black"
              />
            </View>
            <View style={styles.innerContainer}>
              <CalendarPicker onDateChange={this.onDateChange} />
              <Button
                onPress={() =>
                  this.setState({
                    modalVisible: false,
                    textValue: startDate,
                    dateColor: 'black',
                  })
                }
                title=" OK "
                color="black"
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={this.state.modalVisible2}
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => this.closeModal2()}>
          <View style={styles.modalContainer2}>
            <View style={styles.modal_blank2}>
              <Button
                onPress={() => this.closeModal2()}
                title=" CLOSE "
                color="black"
              />
            </View>
            <View style={styles.main}>
              <DatePickerIOS
                date={this.state.chosenDate}
                mode="time"
                onDateChange={this.setDate}
              />
            </View>
            <View style={styles.innerContainer2}>
              <Button
                onPress={() =>
                  this.setState({
                    modalVisible2: false,
                    textValue2: chosenTime,
                    timeColor: 'black',
                  })
                }
                title=" OK "
                color="black"
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={this.state.modalVisible3}
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => this.closeModal3()}>
          <View style={styles.modalContainer_help}>
            <View style={styles.innerContainer_help}>
              <Text
                style={{fontSize: 30,
                  fontWeight: 'bold',
                  paddingLeft: 20,
                  marginTop: -15,}}>
                Information
              </Text>
              <Text
                style={styles.information}>
                1. Get Adress를 눌러 현위치를 받아오세요.
              </Text>
              <Text
                style={styles.information}>
                2. 상세 위치는 입력하지 않아도 됩니다.           
              </Text>
              <Text
                style={styles.information}>
                단, 한 층에 화장실이 여러개인 경우 입력해 주세요.           
              </Text>
              <Text
                style={styles.information}>
                (ex. 302호 옆, 정문 쪽, 사무실 옆, xx카페 옆 등..)          
              </Text>
              <Text
                style={styles.information}>
                3. 몰래 카메라 유무를 입력해 주세요.          
              </Text>
              <Text
                style={styles.information}>
                4. 날짜와 시간을 선택해 주세요.          
              </Text>
              <Text
                style={styles.information}>
                5. UPDATE버튼을 누르면 저장됩니다 ^^          
              </Text>

            </View>
            <View style={styles.modal_blank}>
            <Button
                onPress={() => this.closeModal3()}
                title=" CLOSE "
                color="black"
              />
            </View>
          </View>
        
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    height: '5%',
    backgroundColor: 'white',
  },
  firstView: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  HelpIcon: {
    color: '#CBA6C3',
    paddingLeft: 5,
  },
  information: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  head: {
    color: '#AAABD3',
    fontSize: 27,
  },
  secondView: {
    height: '80%',
    width: '100%',
    backgroundColor: '#AAABD3',
    flexDirection: 'column',
  },
  element: {
    width: '100%',
    height: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  element_time: {
    width: '100%',
    height: '11%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#AAABD3',
  },
  profile: {
    width: '40%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 13,
    height: 50,
    backgroundColor: '#CBA6C3',
  },
  prof: {
    color: '#AAABD3',
    fontSize: 25,
  },
  input: {
    backgroundColor: '#AAABD3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input_: {
    backgroundColor: '#AAABD3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  input_num: {
    width: 30,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 3,
  },
  blank: {
    backgroundColor: '#AAABD3',
    width: '6%',
    height: 50,
  },
  blank_: {
    backgroundColor: '#AAABD3',
    width: '4%',
    height: 50,
  },
  button: {
    width: '47%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonRight: {
    width: '47%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonLeft: {
    width: '47%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonA: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  line: {
    backgroundColor: 'gray',
    width: 1,
    height: 40,
  },
  input_date: {
    width: 120,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  dot_time: {
    width: 13,
    height: 50,
    backgroundColor: '#AAABD3',
  },
  blank_time: {
    width: '40%',
  },
  footer: {
    height: 50,
    backgroundColor: '#AAABD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonB: {
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    marginTop: '40%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },

  innerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  modal_blank: {
    width: '100%',
    height: '7%',
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },

  modalContainer2: {
    width: '100%',
    height: '100%',
    marginTop: '80%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },

  innerContainer2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  modal_blank2: {
    width: '100%',
    height: '7%',
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },

  main: {
    backgroundColor: 'white',
  },

  detail: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#AAABD3',
  },
  detail_loc: {
    width: 180,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  modalContainer_help: {
    width: '100%',
    height: '100%',
    marginTop: '35%',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  innerContainer_help: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});

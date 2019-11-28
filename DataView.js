import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ListView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  toilet: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    borderRightColor: '#CBA6C3',
    borderRightWidth: 3,
    width: 103,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  camera: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    borderRightColor: '#CBA6C3',
    borderRightWidth: 3,
    width: 103,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    width: 169,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailloc: {
    width: '100%',
    height: 40,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#CBA6C3',
    flexDirection: 'row',
  }
});

class DataView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.data}>
          <View style={styles.toilet}>
            <Text style={styles.data1}>{this.props.data1}</Text>
            <Text style={styles.data2}> 층 </Text>
            <Text style={styles.data1}>{this.props.data11}</Text>
            <Text style={styles.data2}> 칸 </Text>
          </View>
          <View style={styles.camera}>
            <Text style={styles.data1}>{this.props.data2}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.data1}>{this.props.data3}</Text>
          </View>
        </View>

        <View style={styles.detailloc}>
          <Text style={styles.data2}>상세 위치: </Text>
          <Text style={styles.data2}>{this.props.data4}</Text>
        </View>
      </View>
    );
  }
}

export default DataView;
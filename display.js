import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import topFrame from './assets/frame-tp.png';
import bottomFrame from './assets/frameInverted-tp.png';
import DogImage from './DogImage';
import StepData from './StepData';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Frames extends React.Component {
  render() {
    return (
      <View style={styles.container}>
	    <View style={styles.backgroundContainer}>
	      <DogImage style={{flex: 1, flexDirection: 'column'}} />
		</View>
		<View style={styles.overlay}>
		  <Image source={topFrame} style={styles.topFrame} />
		  <Image source={bottomFrame} style={styles.bottomFrame} />
		  <StatusBar style="auto" />
	    </View>
		<View style={styles.textPositioning}>
		  <StepData style={styles.textPositioning}/>
	    </View>
      </View>
	);
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
	top: height * 0.12,
	bottom: 0,
	left: width * 0.05,
	right: 0,
	width: width,
	height: height * 0.8,
	resizeMode: 'contain',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
	flexDirection: 'column',
	height: height,
	alignItems: 'center',
	justifyContent: 'flex-start',
	position: 'absolute',
	  top: height * 0.07,
	  bottom: 0,
	  left: 0,
	  right: 0,
  },
  container: {
	  flex: 1,
	  alignItems: 'center',
  },
  topFrame: {
	  width: width,
	  height: height * 0.4,
	  resizeMode: 'contain',
	  marginLeft: width * 0.005,
  },
  bottomFrame: {
	width: width,
	height: height * 0.4,
	resizeMode: 'contain',
	marginTop: height * 0.07,
	marginLeft: width * 0.005,
  },
  textPositioning: {
	position: 'absolute',
	top: height * 0.62,
	bottom: 0,
	left: width * 0.15,
	right: 0,
  }
});

export default Frames;

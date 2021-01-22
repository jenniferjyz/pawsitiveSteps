import { Dimensions, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { Content, Button, Text, View } from 'native-base';
import { Surface } from 'gl-react-expo';
import Tomb from './assets/tombstone.jpg'
import MemoizedFilteredImage from './FilteredImage';
import { Pedometer } from 'expo-sensors';
import * as Battery from 'expo-battery';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class DogImage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dogOpacity: 1,
      blur: 0,
      date: new Date(),
      isPedometerAvailable: 'checking',
      pastStepCount: 6000,
      currentStepCount: 0,
      batteryLevel: 0,
    };
  }

  componentDidMount() {
    this._subscribe();
    this.timerID = setInterval( () => this.tick(), 2000 );
  }

  componentWillUnmount() {
    this._unsubscribe();
    clearInterval(this.timerID);
  }

  _subscribe = () => {
    // Get battery level of device.
    const batteryLevel = Battery.getBatteryLevelAsync();
    this.setState({ batteryLevel });

    // If available, save the step data.
    Pedometer.isAvailableAsync().then(
        result => {
            this.setState({
                isPedometerAvailable: String(result),
            });
        },
        error => {
            this.setState({
                isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
            });
        }
    );

    // Get pedometer from midnight to now.
    const start = new Date();
    const end = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    Pedometer.getStepCountAsync(start, end).then(
        result => {
            this.setState({ pastStepCount: result.steps });
        },
        error => {
            this.setState({
                // pastStepCount: 'Could not get stepCount: ' + error,
                pastStepCount: 6000, // for testing on Android during dev
            });
        }
    );
  }

  _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
  }

  tick() {
    this.setState({ date: new Date() });
    this.updateOpacityBlur();
  }

  updateOpacityBlur = async () => {
    // Opacity calculation based on battery level of device.
    let batteryLevel = parseFloat(this.state.batteryLevel["_W"]);
    if(batteryLevel <= 0.15)
    {
      this.setState({ dogOpacity: 0 })
    }
    else if(batteryLevel >= 0.75)
    {
      this.setState({ dogOpacity: 1 })
    }
    else
    {
      this.setState({ dogOpacity: batteryLevel })
    }
    
    // Blur calculation based on steps.
    if(this.state.pastStepCount >= 6000)
    {
      this.setState({ blur: 0 });
    }
    else
    {
      this.setState({ blur: 10 - (0.001667 * this.state.pastStepCount) });
    }
    
  };

  render() {
    return (
      <Content style={styles.content} showsVerticalScrollIndicator={false}>
         <ImageBackground source={ Tomb } resizeMode='contain' style={styles.tombstone}>
           <View style={{opacity: this.state.dogOpacity}}>
             <Surface style={styles.modifiedDog} ref={ref => (this.image = ref)}>
               <MemoizedFilteredImage blur={this.state.blur}/>
             </Surface>
           </View>
         </ImageBackground>
       </Content>
    );
  }
}

const styles = StyleSheet.create({
  content: { marginTop: 20, marginHorizontal: 20 },
  tombstone: {
    flex: 1,
    justifyContent: 'center',
    opacity: 1,  // Change opacity for tombstone image
	width: width,
  },
  modifiedDog: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    width: width * 0.78,
    height: height * 0.3,
  }
});

export default DogImage;
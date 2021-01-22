import { Dimensions } from 'react-native';
import React from 'react';
import ImageFilters from 'react-native-gl-image-filters';

const width = Dimensions.get('window').width;

// Min and Max range for each filter.
const settings = [
  {
    name: 'hue',
    minValue: 0,
    maxValue: 6.3,
  },
  {
    name: 'blur',
    minValue: 0,
    maxValue: 30,
  },
  {
    name: 'sepia',
    minValue: -5,
    maxValue: 5,
  },
  {
    name: 'sharpen',
    minValue: 0,
    maxValue: 15,
  },
  {
    name: 'negative',
    minValue: -2.0,
    maxValue: 2.0,
  },
  {
    name: 'contrast',
    minValue: -10.0,
    maxValue: 10.0,
  },
  {
    name: 'saturation',
    minValue: 0.0,
    maxValue: 2,
  },
  {
    name: 'brightness',
    minValue: 0,
    maxValue: 5,
  },
  {
    name: 'temperature',
    minValue: 0.0,
    maxValue: 40000.0,
  },
];

class FilteredImage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      ...settings,
      hue: 0,
      blur: this.props.blur,
      sepia: 0,
      sharpen: 0,
      negative: 0,
      contrast: 1,
      saturation: 1,
      brightness: 1,
      temperature: 6500,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ blur: props.blur })
  }

  render() {
    return (
      <ImageFilters {...this.state} width={width} height={width}>
        {{ uri: 'http://192.168.0.69:5000' }}
      </ImageFilters>
    );
  }
}

export default FilteredImage;
export const MemoizedFilteredImage = React.memo(FilteredImage);
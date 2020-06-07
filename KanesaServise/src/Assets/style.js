import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

export default StyleSheet.create({
  headStyle: {
    backgroundColor: 'lightblue',
  },
  cardBG: {
    width: width - 40,
    borderRadius: 5,
  },
  textLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  headText: {
    fontSize: 30,
  },
});

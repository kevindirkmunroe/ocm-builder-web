import convert from 'color-convert';
import {Alert} from 'react-native';

function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function validateEmail(text) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    Alert.alert('Please enter a valid email');
    return false;
  } else {
    return true;
  }
}

function capitalize(str) {
  if (!str) {
    return '';
  }
  const words = str.split(' ');
  const capWords = words.map(word => {
    return _capitalize(word);
  });
  return capWords.join(' ');
}

function HSV2hex(hue, saturation, value) {
  if (saturation <= 1) {
    return convert.hsv.hex(hue, saturation * 100, value * 100);
  }
  return convert.hsv.hex(hue, saturation, value);
}

function HSV2RGB(hue, saturation, value) {
  if (saturation <= 1) {
    return convert.hsv.rgb(hue, saturation * 100, value * 100);
  }
  return convert.hsv.rgb(hue, saturation, value);
}

function RGB2HSV(rgb) {
  return convert.rgb.hsv(rgb);
}

function hex2HSV(hex) {
  return convert.hex.hsv(hex);
}

function hex2RGB(hex) {
  return convert.hex.rgb(hex);
}

module.exports = {
  capitalize,
  validateEmail,
  HSV2hex,
  HSV2RGB,
  RGB2HSV,
  hex2HSV,
  hex2RGB,
};

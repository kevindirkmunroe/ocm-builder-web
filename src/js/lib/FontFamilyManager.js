import {PLATFORM} from './DeviceDimensionManager';

const FONT_FAMILIES = {
  FuturaPtLight: {
    iOS: 'FuturaPt-Light',
    Android: 'FuturaPtLight',
  },
  FuturaPTLight: {
    iOS: 'FuturaPt-Light',
    Android: 'FuturaPtLight',
  },
  FuturaPtBold: {
    iOS: 'FuturaPt-Bold',
    Android: 'FuturaPtBold',
  },
};

const fontf = key => {
  const pack = FONT_FAMILIES[key];
  const name = pack[PLATFORM];
  return name;
};

module.exports = {
  fontf,
};

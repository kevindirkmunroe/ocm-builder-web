import DeviceInfo from 'react-native-device-info';

const DEVICE = DeviceInfo.isTablet() ? 'tablet' : 'phone';
const PLATFORM = DeviceInfo.getBrand() == 'Apple' ? 'iOS' : 'Android';

// Critical dimensions stored in this format:
//
// tablet: {
//     portrait: {
//
//     },
//     landscape: {
//
//     }
// },
// phone: {
//     portrait: {
//
//     },
//     landscape: {
//
//     }
// }
// import { HomeViewDimensions as dimMgr, DEVICE as dv } from '../lib/DeviceDimensionManager';
// dimMgr[dv][orientation].marginTop

const HomeViewDimensions = {
  tablet: {
    portrait: {
      blurb_marginTop: 30,
      recentProjects_marginTop: 10,
      projects_minHeight: 0.6,
      marginTop: 5,
    },
    landscape: {
      blurb_marginTop: 50,
      recentProjects_marginTop: 5,
      projects_minHeight: 0.6,
      marginTop: 5,
    },
  },
  phone: {
    portrait: {
      blurb_marginTop: 46,
      recentProjects_marginTop: 10,
      projects_minHeight: 0.6,
      marginTop: -20,
    },
    landscape: {
      blurb_marginTop: 50,
      recentProjects_marginTop: 5,
      projects_minHeight: 0.46,
      marginTop: -20,
    },
  },
};

const CustomStylesWizardDimensions = {
  tablet: {
    portrait: {
      progressStepsTop: 2,
      marginTop: 0,
    },
    landscape: {
      progressStepsTop: 2,
      marginTop: 0,
    },
  },
  phone: {
    portrait: {
      marginTop: -20,
    },
    landscape: {
      marginTop: -20,
    },
  },
};

const StyleNameViewDimensions = {
  tablet: {
    portrait: {
      marginLeft: 80,
      marginTop: 0,
    },
    landscape: {
      marginLeft: 80,
      marginTop: 0,
    },
  },
  phone: {
    portrait: {
      marginLeft: 5,
      marginTop: 15,
    },
    landscape: {
      marginLeft: 5,
      marginTop: 5,
    },
  },
};

const CustomColorComponentDimensions = {
  tablet: {
    portrait: {
      marginLeft: -40,
      marginLeftRatio: 0.1,
      rgbHsvMarginLeft: 15,
      showColorHistory: true,
      selectedColorMarginTop: -40,
      selectedColorMarginLeft: -172,
      colorHistoryMinHeightRatio: 0.2,
    },
    landscape: {
      marginLeft: -40,
      marginLeftRatio: 0.1,
      rgbHsvMarginLeft: 15,
      showColorHistory: true,
      selectedColorMarginTop: -40,
      selectedColorMarginLeft: -194,
      colorHistoryMinHeightRatio: 0.25,
    },
  },
  phone: {
    portrait: {
      marginLeft: -15,
      marginLeftRatio: 0.1,
      rgbHsvMarginLeft: 3,
      showColorHistory: false,
      selectedColorMarginTop: -40,
      selectedColorMarginLeft: -100,
    },
    landscape: {
      marginLeft: -15,
      marginLeftRatio: 0.1,
      rgbHsvMarginLeft: 3,
      showColorHistory: false,
    },
  },
};

const CustomColorModalDimensions = {
  tablet: {
    portrait: {
      widthRatio: 0.8,
      maxHeightRatio: 0.45,
      marginLeftRatio: 0.1,
      marginTopRatio: 0.2,
    },
    landscape: {
      widthRatio: 0.6,
      maxHeightRatio: 0.8,
      marginLeftRatio: 0.2,
      marginTopRatio: 0.1,
    },
  },
  phone: {
    portrait: {
      widthRatio: 1,
      maxHeightRatio: 0.6,
      marginLeftRatio: 0,
      rgbHsvMarginLeft: 3,
      marginTopRatio: 0.2,
    },
    landscape: {
      widthRatio: 1,
      maxHeightRatio: 0.45,
      marginLeftRatio: 0,
      rgbHsvMarginLeft: 3,
      marginTopRatio: 0.2,
    },
  },
};

const LayerStackComponentDimensions = {
  tablet: {
    portrait: {
      compositeWidthRatio: 0.5,
      compositeHeightRatio: 0.3,
      blankSpaceWidthRatio: 0.07,
    },
    landscape: {
      compositeWidthRatio: PLATFORM === 'iOS' ? 0.67 : 0.66,
      compositeHeightRatio: 0.4,
      blankSpaceWidthRatio: 0,
    },
  },
  phone: {
    portrait: {
      compositeWidthRatio: 0.9,
      compositeHeightRatio: 0.3,
      blankSpaceWidthRatio: 0,
    },
    landscape: {
      compositeWidthRatio: 0.3,
      compositeHeightRatio: 0.4,
      blankSpaceWidthRatio: 0,
    },
  },
};

const LayerComponentDimensions = {
  tablet: {
    portrait: {
      printRollerWidth: 130,
      layerIdMarginLeft: 10,
      colorButtonMarginLeft: 60,
      printRollerNameMarginLeft: 15,
      hideButtonMarginLeft: 50,
      trashButtonMarginLeft: 30,
      colorButtonWidth: 100,
    },
    landscape: {
      printRollerWidth: 130,
      colorButtonMarginLeft: 6,
      layerIdMarginLeft: 10,
      printRollerNameMarginLeft: 15,
      hideButtonMarginLeft: 6,
      trashButtonMarginLeft: 6,
      colorButtonWidth: 100,
    },
  },
  phone: {
    portrait: {
      printRollerWidth: 50,
      colorButtonMarginLeft: 6,
      layerIdMarginLeft: 3,
      printRollerNameMarginLeft: 3,
      hideButtonMarginLeft: 5,
      trashButtonMarginLeft: 5,
      colorButtonWidth: 90,
    },
    landscape: {
      printRollerWidth: 50,
      colorButtonMarginLeft: 6,
      layerIdMarginLeft: 3,
      printRollerNameMarginLeft: 3,
      hideButtonMarginLeft: 5,
      trashButtonMarginLeft: 5,
      colorButtonWidth: 90,
    },
  },
};

const PrintRollerModalDimensions = {
  tablet: {
    portrait: {
      marginLeft: 120,
      marginTopRatio: 0.1,
      widthRatio: 0.7,
      maxHeightRatio: 0.8,
    },
    landscape: {
      marginLeft: 140,
      marginTopRatio: 0.03,
      widthRatio: 0.8,
      maxHeightRatio: 1,
    },
  },
  phone: {
    portrait: {
      marginLeft: 0,
      marginTopRatio: 0.12,
      widthRatio: 1,
      maxHeightRatio: 0.9,
    },
    landscape: {
      marginLeft: 0,
      marginTopRatio: 0.1,
      widthRatio: 1,
      maxHeightRatio: 0.75,
    },
  },
};

const BackgroundColorViewDimensions = {
  tablet: {
    portrait: {
      tabWidth: 180,
      marginTopStandard: -20,
      marginTopCustom: -10,
    },
    landscape: {
      tabWidth: 180,
      marginTopStandard: -20,
      marginTopCustom: -10,
    },
  },
  phone: {
    portrait: {
      tabWidth: 100,
      marginTopStandard: -5,
      marginTopCustom: 7,
    },
    landscape: {
      tabWidth: 100,
      marginTopStandard: 20,
      marginTopCustom: 20,
    },
  },
};

module.exports = {
  DEVICE,
  PLATFORM,
  HomeViewDimensions,
  CustomStylesWizardDimensions,
  StyleNameViewDimensions,
  CustomColorComponentDimensions,
  CustomColorModalDimensions,
  LayerStackComponentDimensions,
  LayerComponentDimensions,
  PrintRollerModalDimensions,
  BackgroundColorViewDimensions,
};

import React, {Component} from 'react';
import ProgressSteps from '../ProgressSteps/ProgressSteps';
import ProgressStep from '../ProgressSteps/ProgressStep';
import {Dimensions, Image, SafeAreaView, View} from 'react-native';
import {styles} from '../lib/StyleManager';

const buttonTextStyle = {
  color: '#393939',
  fontWeight: 'bold',
  fontSize: 25,
};

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

class StandardStylesWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
        isFirstStep: false,
        isLastStep: false,
        errors: true,
      });
    });
  }

  onStyleSelected = styleName => {
    this.setState({
      styleName,
      isValid: true,
    });
  };

  onBackgroundColorSelected = backgroundColor => {
    this.setState({
      backgroundColor,
    });
  };

  onLayerAdded = printRollerLayer => {
    const {printRollerLayers} = this.state;
    printRollerLayers.push(printRollerLayer);

    this.setState({
      printRollerLayers,
      isValid: true,
    });
  };

  onLayerRemoved = printRollerLayer => {
    const {printRollerLayers} = this.state;

    const remainingLayers = _.filter(printRollerLayers, x => {
      return x.id !== printRollerLayer.id;
    });
    this.setState({
      printRollerLayers: remainingLayers,
      isValid: true,
    });
  };

  onNextStep = () => {
    if (!this.state.isValid) {
      this.setState({errors: true});
    } else {
      this.setState({errors: false, isValid: false});
    }
  };

  onRestart = () => {
    this.setState({
      styleName: undefined,
      backgroundColor: undefined,
      printRollerLayers: [],
    });
  };

  render() {
    const {errors, orientation} = this.state;
    const brandIconStyle =
      orientation === 'landscape'
        ? styles.imageBrandIcon
        : styles.imageBrandIcon_phone;

    return (
      <SafeAreaView>
        <Image
          style={brandIconStyle}
          source={require('../../images/ocm-image-small.png')}
        />
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <ProgressSteps>
            <ProgressStep
              label="1. Choose Style"
              onNext={this.onNextStep}
              skipBtnDisabled={true}
              restartBtnDisabled={true}
              errors={errors}
              skipBtnTextStyle={buttonTextStyle}
              restartBtnTextStyle={buttonTextStyle}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View style={{alignItems: 'center'}} />
            </ProgressStep>
            <ProgressStep
              label="2. Choose Background Color"
              onNext={this.onNextStep}
              onRestart={this.onRestart}
              onSkip={this.onTextureSkipped}
              errors={errors}
              skipBtnTextStyle={buttonTextStyle}
              restartBtnTextStyle={buttonTextStyle}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View style={{alignItems: 'center'}} />
            </ProgressStep>
            <ProgressStep
              label="3. Choose Layer Colors"
              skipBtnDisabled={true}
              onNext={this.onNextStep}
              onRestart={this.onRestart}
              errors={errors}
              skipBtnTextStyle={buttonTextStyle}
              restartBtnTextStyle={buttonTextStyle}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View style={{alignItems: 'center'}} />
            </ProgressStep>
            <ProgressStep
              label="4. Summary"
              skipBtnDisabled={true}
              onRestart={this.onRestart}
              restartBtnTextStyle={buttonTextStyle}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View style={{alignItems: 'center'}} />
            </ProgressStep>
          </ProgressSteps>
        </View>
      </SafeAreaView>
    );
  }
}

export default StandardStylesWizard;

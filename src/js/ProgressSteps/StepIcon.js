import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {OCM} from '../lib/AppSkinManager';

class StepIcon extends Component {
  render() {
    let styles;

    if (this.props.isActiveStep) {
      styles = {
        circleStyle: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: this.props.activeStepIconColor,
          borderColor: this.props.activeStepIconBorderColor,
          borderWidth: 5,
          bottom: 2,
        },
        circleText: {
          alignSelf: 'center',
          top: 20 / 3,
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 2,
          fontFamily: this.props.labelFontFamily,
          color: this.props.activeLabelColor,
          fontSize: 18,
        },
        leftBar: {
          position: 'absolute',
          top: 40 / 2.22,
          left: 0,
          right: 40 + 8,
          borderTopStyle: this.props.borderStyle,
          borderTopWidth: this.props.borderWidth,
          borderTopColor: this.props.completedProgressBarColor,
          marginRight: 40 / 2 + 2,
        },
        rightBar: {
          position: 'absolute',
          top: 40 / 2.22,
          right: 0,
          left: 40 + 8,
          borderTopStyle: this.props.borderStyle,
          borderTopWidth: this.props.borderWidth,
          borderTopColor: this.props.progressBarColor,
          marginLeft: 40 / 2 + 2,
        },
        stepNum: {
          color: this.props.activeStepNumColor,
        },
      };
    } else if (this.props.isCompletedStep) {
      styles = {
        circleStyle: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: this.props.completedStepIconColor,
        },
        circleText: {
          alignSelf: 'center',
          top: 18 / 2,
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 2,
          fontFamily: this.props.labelFontFamily,
          color: this.props.labelColor,
          marginTop: 4,
        },
        leftBar: {
          position: 'absolute',
          top: 36 / 2,
          left: 0,
          right: 36 + 8,
          borderTopStyle: this.props.borderStyle,
          borderTopWidth: this.props.borderWidth,
          borderTopColor: this.props.completedProgressBarColor,
          marginRight: 36 / 2 + 4,
        },
        rightBar: {
          position: 'absolute',
          top: 36 / 2,
          right: 0,
          left: 36 + 8,
          borderTopStyle: this.props.borderStyle,
          borderTopWidth: this.props.borderWidth,
          borderTopColor: this.props.completedProgressBarColor,
          marginLeft: 36 / 2 + 4,
        },
        stepNum: {
          color: this.props.completedStepNumColor,
        },
      };
    } else {
      styles = {
        circleStyle: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: this.props.disabledStepIconColor,
        },
        circleText: {
          alignSelf: 'center',
          top: 18 / 2,
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 2,
          fontFamily: this.props.labelFontFamily,
          color: this.props.labelColor,
          marginTop: 4,
        },
        leftBar: {
          position: 'absolute',
          top: 36 / 2,
          left: 0,
          right: 36 + 8,
          borderTopStyle: this.props.borderStyle,
          borderTopWidth: this.props.borderWidth,
          borderTopColor: this.props.progressBarColor,
          marginRight: 36 / 2 + 4,
        },
        rightBar: {
          position: 'absolute',
          top: 36 / 2,
          right: 0,
          left: 36 + 8,
          borderTopStyle: this.props.borderStyle,
          borderTopWidth: this.props.borderWidth,
          borderTopColor: this.props.progressBarColor,
          marginLeft: 36 / 2 + 4,
        },
        stepNum: {
          color: this.props.disabledStepNumColor,
        },
      };
    }

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <View style={styles.circleStyle}>
          <Text style={styles.circleText}>
            {this.props.isCompletedStep ? (
              <Text style={{color: this.props.completedCheckColor}}>
                &#10003;
              </Text>
            ) : (
              <Text style={styles.stepNum}>{this.props.stepNum}</Text>
            )}
          </Text>
        </View>
        <Text style={styles.labelText}>{this.props.label}</Text>
        {!this.props.isFirstStep && <View style={styles.leftBar} />}
        {!this.props.isLastStep && <View style={styles.rightBar} />}
      </View>
    );
  }
}

StepIcon.defaultProps = {
  borderWidth: 6,
  borderStyle: 'solid',
  activeStepIconColor: 'transparent',
  labelColor: '#D3D3D3',
  activeStepNumColor: 'black',
  completedStepNumColor: 'black',
  disabledStepNumColor: 'white',
  completedCheckColor: 'white',

  activeStepIconBorderColor: OCM.fontColor,
  activeLabelColor: OCM.fontColor,
  progressBarColor: '#ebebe4',
  completedProgressBarColor: OCM.fontColor,
  completedStepIconColor: OCM.fontColor,
  disabledStepIconColor: '#ebebe4',
};

export default StepIcon;

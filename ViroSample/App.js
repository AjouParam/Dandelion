/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, PixelRatio, Image, Alert, TouchableHighlight } from 'react-native';
import { ViroARSceneNavigator, ViroFlexView } from 'react-viro';
import ARDrivingCar from './js/RCcar/ARDrivingCar';
import ARHitApp from './js/HitPractice/ARHItApp';
import DialogInput from 'react-native-dialog-input';
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: 'API_KEY_HERE',
};

// Sets the default scene you want for AR and VR
var InitialNormalScene = require('./js/HelloWorldSceneAR');

var UNSET = 'UNSET';
var Normal_NAVIGATOR_TYPE = 'Normal';
var RCcar_NAVIGATOR_TYPE = 'Car';
var ARHit_NaviGator_TYPE = 'Hit';

var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      viroAppProps: {
        artext: '',
        arshow: false,
      },
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      isWrite: false,
      show: false,
    };

    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getRCcarNavigator = this._getRCcarNavigator.bind(this);
    this._getARHitNavigator = this._getARHitNavigator.bind(this);
    this._getButtonOnPress = this._getButtonOnPress.bind(this);
    this._showPopup = this._showPopup.bind(this);
    this._hidePopup = this._hidePopup.bind(this);
    this._onCreateARPost = this._onCreateARPost.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    }
  }

  _getExperienceSelector() {
    return (
      <View style={localStyles.normal}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          style={localStyles.normal}
          initialScene={{ scene: InitialNormalScene }}
          viroAppProps={this.state.viroAppProps}
        />
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          <TouchableHighlight style={localStyles.writebuttons} onPress={this._showPopup} underlayColor={'#00000000'}>
            <Image source={require('./js/res/btn_mode_objects.png')} />
          </TouchableHighlight>
        </View>
        <DialogInput
          isDialogVisible={this.state.show}
          title={'Write AR Message!'}
          message={'Input your own Message'}
          hintInput={'write on here'}
          submitInput={(inputText) => {
            this._onCreateARPost(inputText);
          }}
          closeDialog={this._hidePopup}
        ></DialogInput>
      </View>
    );
  }
  _showPopup() {
    this.setState({
      show: true,
    });
  }
  _hidePopup() {
    this.setState({
      show: false,
    });
  }
  _onCreateARPost(inputText) {
    this.setState({
      viroAppProps: {
        artext: inputText,
        arshow: true,
      },
    });
  }
  _getRCcarNavigator() {
    return <ARDrivingCar></ARDrivingCar>;
  }
  _getARHitNavigator() {
    return <ARHitApp></ARHitApp>;
  }

  _getButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
      });
    };
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  normal: {
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
  },
  buttons: {
    height: 30,
    width: 50,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: '#000000',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  writebuttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
});
module.exports = ViroSample;

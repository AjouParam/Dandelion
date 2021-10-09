/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, PixelRatio, TouchableHighlight } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import ARDrivingCar from './js/RCcar/ARDrivingCar';
import ARHitApp from './js/HitPractice/ARHItApp';
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
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
    };

    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getNormalNavigator = this._getNormalNavigator.bind(this);
    this._getRCcarNavigator = this._getRCcarNavigator.bind(this);
    this._getARHitNavigator = this._getARHitNavigator.bind(this);
    this._getButtonOnPress = this._getButtonOnPress.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == Normal_NAVIGATOR_TYPE) {
      return this._getNormalNavigator();
    } else if (this.state.navigatorType == RCcar_NAVIGATOR_TYPE) {
      return this._getRCcarNavigator();
    } else if (this.state.navigatorType == ARHit_NaviGator_TYPE) {
      return this._getARHitNavigator();
    }
  }

  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Choose Three Experience</Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getButtonOnPress(Normal_NAVIGATOR_TYPE)}
            underlayColor={'#000000'}
          >
            <Text style={localStyles.buttonText}>Normal</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getButtonOnPress(RCcar_NAVIGATOR_TYPE)}
            underlayColor={'#000000'}
          >
            <Text style={localStyles.buttonText}>RCcar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getButtonOnPress(ARHit_NaviGator_TYPE)}
            underlayColor={'#000000'}
          >
            <Text style={localStyles.buttonText}>ARHit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getNormalNavigator() {
    return <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{ scene: InitialNormalScene }} />;
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
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#000000',
    borderRadius: 10,
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
});
module.exports = ViroSample;

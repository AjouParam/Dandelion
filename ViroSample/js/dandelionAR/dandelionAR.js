import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, Text, View, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

import renderIf from './renderIf';
var InitialARScene = require('./dandelionARScene');

// Array of 3d models that we use in this sample. This app switches between this these models.
//var objArray = [require('./res/object_flowers/object_flowers.vrx'), require('./res/emoji_smile/emoji_smile.vrx')];
var objpost = require('./res/ARpost.png');
export default class dandelionAR extends Component {
  constructor() {
    super();

    this.state = {
      viroAppProps: {
        displayObject: false,
        objectSource: objpost,
        yOffset: 0,
        _onLoadEnd: this._onLoadEnd,
        _onLoadStart: this._onLoadStart,
        _onTrackingInit: this._onTrackingInit,
      },
      trackingInitialized: false,
      isLoading: false,
    };
  }

  render() {
    return (
      <View style={localStyles.outer}>
        <ViroARSceneNavigator
          style={localStyles.arView}
          apiKey="API_KEY_HERE"
          initialScene={{ scene: InitialARScene, passProps: { displayObject: this.state.displayObject } }}
          viroAppProps={this.state.viroAppProps}
        />

        {this._renderTrackingText()}

        {renderIf(
          this.state.isLoading,
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" animating={this.state.isLoading} color="#ffffff" />
          </View>,
        )}
      </View>
    );
  }

  // Invoked when a model has started to load, we show a loading indictator.
  _onLoadStart() {
    this.setState({
      isLoading: true,
    });
  }

  // Invoked when a model has loaded, we hide the loading indictator.
  _onLoadEnd() {
    this.setState({
      isLoading: false,
    });
  }

  _renderTrackingText() {
    if (this.state.trackingInitialized) {
      return;
    } else {
      return (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#ffffff22',
            left: 30,
            right: 30,
            top: 30,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: '#ff0000' }}>Waiting for tracking</Text>
        </View>
      );
    }
  }

  _onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }
}

var localStyles = StyleSheet.create({
  outer: {
    flex: 1,
  },

  arView: {
    flex: 1,
  },

  buttons: {
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

module.exports = dandelionAR;

'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants, ViroButton } from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onEmailTap = this._onEmailTap.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroButton
          source={require('./res/emailenclose.png')}
          clickSource={require('./res/emailopen.png')}
          position={[0, -1, -2]}
          height={1}
          width={1}
          onClick={this._onEmailTap}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    this.setState({
      text: '팀 파람 AR',
    });
  }

  _onEmailTap(state, source) {
    this.setState({
      text: '이벤트 확인',
    });
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'NotoSansCJK',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;

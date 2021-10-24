'use strict';

import React, { Component } from 'react';

import { AppRegistry, StyleSheet, View } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroButton,
  ViroAnimations,
  ViroMaterials,
  ViroImage,
  ViroNode,
} from 'react-viro';
import DialogInput from 'react-native-dialog-input';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      points: [[0, 0, 0]],
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onEmailTap = this._onEmailTap.bind(this);
    this._onClickARPost = this._onClickARPost.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onCreateARPost = this._onCreateARPost.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -5]}
          style={styles.helloWorldTextStyle}
        />

        {/* <ViroButton
          source={require('./res/emailenclose.png')}
          clickSource={require('./res/emailopen.png')}
          position={[0, -1, -5]}
          height={0.5}
          width={0.5}
          animation={{ name: 'moveLeftandRight', run: true, loop: true }}
          onClick={this._onEmailTap}
        /> */}
        {this._onCreatePost([5, 0, -2], [5, -1, -2])}
        {this._onCreatePost([3, 0, -5], [3, -1, -5])}
        {this._onCreatePost([-3, 0, -2], [-3, -1, -2])}
        {this._onCreatePost([-2, 0, -7], [-2, -1, -7])}
        {this._onCreateARPost(
          this.props.arSceneNavigator.viroAppProps.arshow,
          this.props.arSceneNavigator.viroAppProps.artext,
        )}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    this.setState({
      text: '팀 파람 AR',
    });
  }
  _onClickARPost(state, reason) {
    this.setState({
      text: '게시글 열람',
    });
  }

  _onEmailTap(state, source) {
    this.setState({
      text: '이벤트 확인',
    });
  }
  _onCreateARPost(show, message) {
    var model = [];
    if (show) {
      model.push(
        <ViroText
          position={[0, 0, 0]}
          transformBehaviors={'billboard'}
          text={message}
          style={styles.arpost}
        ></ViroText>,
      );
    }
    return model;
  }
  _onCreatePost(position, positionT) {
    var model = [];
    model.push(
      <ViroNode>
        <ViroImage
          position={position}
          transformBehaviors={'billboard'}
          source={require('./res/ARpost.png')}
          width={1}
          height={1}
          onClick={this._onClickARPost}
          renderingOrder={0}
        />
        <ViroText
          position={positionT}
          transformBehaviors={'billboard'}
          text={'ARPost'}
          style={styles.arpost}
          renderingOrder={-1}
        />
      </ViroNode>,
    );
    return model;
  }
}
ViroAnimations.registerAnimations({
  moveRight: { properties: { positionX: '+=0.5' }, duration: 1000 },
  moveLeft: { properties: { positionX: '-=0.5' }, duration: 1000 },
  moveLeftandRight: [['moveRight', 'moveLeft', 'moveLeft', 'moveRight']],
});

ViroMaterials.createMaterials({
  white: {
    diffuseColor: '#ffffff',
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'NotoSansCJK',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  arpost: {
    fontFamily: 'NotoSansCJK',
    fontSize: 20,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  artext: {
    fontFamily: 'NotoSansCJK',
    fontSize: 10,
    color: '#ff0000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;

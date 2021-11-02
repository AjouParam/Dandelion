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
      points: [0, 0, 0],
      arrowRot: [-90, 0, 0],
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onEmailTap = this._onEmailTap.bind(this);
    this._onClickARPost = this._onClickARPost.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onCreateARPost = this._onCreateARPost.bind(this);
    this._trackingCamera = this._trackingCamera.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} onCameraTransformUpdate={this._trackingCamera}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -5]}
          style={styles.helloWorldTextStyle}
        />
        <ViroImage
          position={this.state.points}
          source={require('./res/arrow.png')}
          rotation={[-90, 30, 0]}
          renderingOrder={-1}
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
        {this._onCreatePost([7, 0, -5], [7, 0, -5])}
        {this._onCreatePost([3, 0, -5], [3, 0, -5])}
        {this._onCreatePost([-3, 0, -2], [-3, 0, -2])}
        {this._onCreatePost([-2, 0, -7], [-2, 0, -7])}
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
  _trackingCamera(cameraTransform) {
    this.setState({
      points: [cameraTransform.position[0], -1, cameraTransform.position[2] - 1],
    });
  }
  _onCreateArrow(destPosition) {
    var model = [];
    model.push(
      <ViroImage position={[0, -1, -1]} source={require('./res/arrow.png')} rotation={arrowRot} renderingOrder={-1} />,
    );
  }
  _onCreateARPost(show, message) {
    var model = [];
    if (show) {
      model.push(
        <ViroNode>
          <ViroImage
            position={[0, 0, 0]}
            transformBehaviors={'billboard'}
            source={require('./res/dialogicon.png')}
            width={2.4}
            height={0.8}
            onClick={this._onClickARPost}
            renderingOrder={0}
          />
          <ViroText
            position={[0, 0, 0]}
            transformBehaviors={'billboard'}
            text={message}
            style={styles.artext}
            renderingOrder={-1}
          />
        </ViroNode>,
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
          source={require('./res/dialogicon.png')}
          width={3}
          height={1}
          onClick={this._onClickARPost}
          renderingOrder={0}
        />
        <ViroText
          position={positionT}
          transformBehaviors={'billboard'}
          text={'OO왔었음'}
          style={styles.arpost}
          renderingOrder={-1}
        />
      </ViroNode>,
    );
    return model;
  }
  // _onCreateArrow(cameraTransform){
  //   var model = [];
  //   model.push(
  //     <ViroImage position={} rotation={} source={} renderingOrder={-1}></ViroImage>,
  //   );
  //   return model;
  // }
  // _lookatObject(destPosition){

  // }
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
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  artext: {
    fontFamily: 'NotoSansCJK',
    fontSize: 20,
    color: '#ff0000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;

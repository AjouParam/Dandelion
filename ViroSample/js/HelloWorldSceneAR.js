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
  Viro3DObject,
} from 'react-viro';
import DialogInput from 'react-native-dialog-input';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      points: [0, 0, 0],
      target: [0, 0, 0],
      arrowRot: [-90, 0, 0],
      arvisible: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onEmailTap = this._onEmailTap.bind(this);
    this._onClickARPost = this._onClickARPost.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onCreateARPost = this._onCreateARPost.bind(this);
    this._trackingCamera = this._trackingCamera.bind(this);
    this._LookAtTarget = this._LookAtTarget.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} onCameraTransformUpdate={this._trackingCamera}>
        <Viro3DObject
          source={require('./res/3DArrow.obj')}
          materials={['arrowDiff']}
          position={this.state.points}
          scale={[0.001, 0.001, 0.001]}
          rotation={this.state.arrowRot}
          visible={this.state.arvisible}
          type="OBJ"
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
        {this._onCreatePost([-5, 0, -15], [-5, 0, -15], '롯x마트 다녀옴')}
        {this._onCreatePost([3, 0, -1], [3, 0, -1], '여기 맛있음!')}
        {this._onCreatePost([-3, 0, -8], [-3, 0, -8], '철수랑 1일')}
        {this._onCreatePost([2, 0, -5], [2, 0, -5], '파람 최고에요')}
        {this._onCreatePost([4, 0, -5], [4, 0, -5], '안녕하세요')}
        {this._onCreatePost([-4, 0, -9], [-4, 0, -9], '반가워요!')}
        {this._onCreatePost([4, 0, 5], [4, 0, 5], '여긴 어때요?')}
        {this._onCreatePost([-2, 0, 7], [-2, 0, 7], '다 괜찮네요')}
        {this._onCreatePost([-5, 0, 15], [-5, 0, 15], '신기하당')}
        {this._onCreatePost([-9, 0, -20], [-9, 0, -20], '많이 신기해요')}
        {this._onCreatePost([5, 0, -18], [5, 0, -18], '어떻게 하는거지')}
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
  _onClickARPost(position, source) {
    this.setState({
      arvisible: true,
      target: position,
    });
  }

  _onEmailTap(state, source) {
    this.setState({
      text: '이벤트 확인',
    });
  }
  _trackingCamera(cameraTransform) {
    if (this.state.arvisible) {
      var Euler = (cameraTransform.rotation[1] / 180) * Math.PI;
      var positionX = Math.sin(Euler) * -1;
      positionX += cameraTransform.position[0];
      var positionZ = Math.cos(Euler) * -1;
      positionZ += cameraTransform.position[2];

      this.setState({
        points: [positionX, 0, positionZ],
      });

      this._LookAtTarget(this.state.points, this.state.target);
    }
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
            width={2.4}
            height={0.8}
            style={styles.artext}
            renderingOrder={-1}
          />
        </ViroNode>,
      );
    }
    return model;
  }
  _onCreatePost(position, positionT, message) {
    var model = [];
    var arposition = position;
    var text = message;
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
          text={text}
          width={3}
          height={1}
          style={styles.arpost}
          renderingOrder={-1}
        />
      </ViroNode>,
    );
    return model;
  }
  _LookAtTarget(targetP, destP) {
    var lengthZ = destP[2] - targetP[2];
    var lengthX = destP[0] - targetP[0];
    var tangent = Math.atan(lengthX / lengthZ);
    tangent = (tangent * 180) / Math.PI;
    this.setState({
      arrowRot: [-90, tangent, 0],
    });
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
  black: {
    diffuseColor: '#000000',
  },
  arrowDiff: {
    diffuseColor: '#f3d737',
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
    color: '#00ff00',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  artext: {
    fontFamily: 'NotoSansCJK',
    fontSize: 15,
    color: '#ff0000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;

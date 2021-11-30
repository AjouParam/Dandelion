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
    this._ArriveTarget = this._ArriveTarget.bind(this);
    this._CancelArrow = this._CancelArrow.bind(this);
  }

  render() {
    return (
      <ViroARScene
        onTrackingInitialized={this._onInitialized}
        onCameraTransformUpdate={this._trackingCamera}
        onClick={this._CancelArrow}
      >
        <Viro3DObject
          source={require('./res/3DArrow.obj')}
          materials={['arrowDiff']}
          position={this.state.points}
          scale={[0.001, 0.001, 0.001]}
          rotation={this.state.arrowRot}
          visible={this.state.arvisible}
          type="OBJ"
        />
        {/* <ViroText
          position={this.state.points}
          transformBehaviors={'billboard'}
          text={this.state.text}
          style={styles.helloWorldTextStyle}
          renderingOrder={-1}
        /> */}
        {/* <ViroButton
          source={require('./res/emailenclose.png')}
          clickSource={require('./res/emailopen.png')}
          position={[0, -1, -5]}
          height={0.5}
          width={0.5}
          animation={{ name: 'moveLeftandRight', run: true, loop: true }}
          onClick={this._onEmailTap}
        /> */}
        {this._onCreatePost([-5, 1, -15], [-5, 0.9, -14.93], '롯x마트 다녀옴')}
        {this._onCreatePost([3, 0, -2], [3, -0.1, -1.93], '여기 맛있음!')}
        {this._onCreatePost([-3, 0, -8], [-3, -0.1, -7.93], '철수랑 1일')}
        {this._onCreatePost([2, 0, -5], [2, -0.1, -4.93], '파람 최고에요')}
        {this._onCreatePost([4, 0, -5], [4, -0.1, -4.93], '안녕하세요')}
        {this._onCreatePost([-4, -1, -9], [-4, -1.1, -8.93], '반가워요!')}
        {this._onCreatePost([4, 0, 5], [4, -0.1, 4.97], '여긴 어때요?')}
        {this._onCreatePost([-2, 0, 7], [-2, -0.1, 6.97], '다 괜찮네요')}
        {this._onCreatePost([-5, 0, 15], [-5, -0.1, 14.97], '신기하당')}
        {this._onCreatePost([-12, 0, -20], [-12, -0.1, -19.93], '많이 신기해요')}
        {this._onCreatePost([5, 0, -18], [5, -0.1, -17.93], '어떻게 하는거지')}
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
      var camerarotation = cameraTransform.rotation[1];

      var Euler = (camerarotation / 180) * Math.PI;
      var positionX = Math.sin(Euler) * -1;
      positionX += cameraTransform.position[0];
      var positionZ = Math.cos(Euler) * -1;
      if (this.props.arSceneNavigator.viroAppProps.flip) {
        positionZ *= -1;
      } else {
        positionZ *= 1;
      }
      positionZ += cameraTransform.position[2];

      this.setState({
        points: [positionX, 0, positionZ],
      });

      this._LookAtTarget(this.state.points, this.state.target);
      this._ArriveTarget(this.state.points, this.state.target);
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
            source={require('./res/PostBox.png')}
            width={3.4}
            height={2}
            onClick={this._onClickARPost}
            renderingOrder={0}
          />
          <ViroText
            position={[0, -0.1, 0.01]}
            transformBehaviors={'billboard'}
            text={message}
            width={2.4}
            height={0.8}
            style={styles.artext}
            renderingOrder={0}
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
          source={require('./res/PostBox.png')}
          width={3.4}
          height={2}
          onClick={this._onClickARPost}
          renderingOrder={0}
        />
        <ViroText
          position={positionT}
          transformBehaviors={'billboard'}
          text={text}
          width={3.4}
          height={0.8}
          style={styles.arpost}
          renderingOrder={0}
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

  _ArriveTarget(targetP, destP) {
    var lengthX = destP[0] - targetP[0];
    var lengthZ = destP[2] - targetP[2];
    var length = Math.sqrt(lengthX * lengthX + lengthZ * lengthZ);
    if (length < 0.1) {
      this.setState({
        arvisible: false,
      });
    }
  }
  _CancelArrow() {
    this.setState({
      arvisible: false,
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
    fontSize: 15,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  arpost: {
    fontFamily: 'NotoSansCJK',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  artext: {
    fontFamily: 'NotoSansCJK',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;

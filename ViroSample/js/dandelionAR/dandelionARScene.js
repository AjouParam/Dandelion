/**
 * Copyright (c) 2017-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, { Component } from 'react';

import {
  ViroARScene,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroNode,
  ViroUtils,
  ViroQuad,
  ViroSpotLight,
  Viro3DObject,
  ViroText,
  ViroImage,
} from 'react-viro';

import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';

var createReactClass = require('create-react-class');

var dandelionARScene = createReactClass({
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      objPosition: [0, 0, 0],
      scale: [0.2, 0.2, 0.2],
      rotation: [0, 0, 0],
      shouldBillboard: true,
      arpost: [],
      position: [0, 0, 0],
      title: 'testPost',
    };
  },

  render: function () {
    return (
      <ViroARScene ref="arscene" onTrackingInitialized={this._onTrackInit}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {this._getARPost()}
      </ViroARScene>
    );
  },

  _getARPost() {
    this.state.arpost.push(
      <ViroImage
        position={this.state.position}
        transformBehaviors={'billboard'}
        source={require('./res/ARpost.png')}
        width={1}
        height={1}
        onClick={this._onClick}
        onLoadEnd={this._onLoadEnd}
        onLoadStart={this._onLoadStart}
      >
        <ViroText
          position={this.state.position}
          transformBehaviors={'billboard'}
          text={this.state.title}
          renderingOrder={-1}
          style={this._getStyle()}
        />
      </ViroImage>,
    );
    return this.state.arpost;
  },
  _onClick() {},

  _setARNodeRef(component) {
    this.arNodeRef = component;
  },

  _setSpotLightRef(component) {
    this.spotLight = component;
  },

  _onTrackInit() {
    this.props.arSceneNavigator.viroAppProps._onTrackingInit();
  },

  _onLoadStart() {
    this.setState({
      shouldBillboard: true,
    });
    this.props.arSceneNavigator.viroAppProps._onLoadStart();
  },
  // Perform a hit test on load end to display object.
  _onLoadEnd() {
    this.refs['arscene'].getCameraOrientationAsync().then((orientation) => {
      this.refs['arscene'].performARHitTestWithRay(orientation.forward).then((results) => {
        this._onArHitTestResults(orientation.position, orientation.forward, results);
      });
    });
    this.props.arSceneNavigator.viroAppProps._onLoadEnd();
  },

  _onArHitTestResults(position, forward, results) {
    // Default position is just 1.5 meters in front of the user.
    let newPosition = [forward[0] * 1.5, forward[1] * 1.5, forward[2] * 1.5];
    let hitResultPosition = undefined;

    // Filter the hit test results based on the position.
    if (results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        let result = results[i];
        if (result.type == 'ExistingPlaneUsingExtent') {
          var distance = Math.sqrt(
            (result.transform.position[0] - position[0]) * (result.transform.position[0] - position[0]) +
              (result.transform.position[1] - position[1]) * (result.transform.position[1] - position[1]) +
              (result.transform.position[2] - position[2]) * (result.transform.position[2] - position[2]),
          );
          if (distance > 0.2 && distance < 10) {
            // If we found a plane greater than .2 and less than 10 meters away then choose it!
            hitResultPosition = result.transform.position;
            break;
          }
        } else if (result.type == 'FeaturePoint' && !hitResultPosition) {
          // If we haven't found a plane and this feature point is within range, then we'll use it
          // as the initial display point.
          var distance = this._distance(position, result.transform.position);
          if (distance > 0.2 && distance < 10) {
            hitResultPosition = result.transform.position;
          }
        }
      }
    }

    if (hitResultPosition) {
      newPosition = hitResultPosition;
    }

    // Set the initial placement of the object using new position from the hit test.
    this._setInitialPlacement(newPosition);
  },

  _setInitialPlacement(position) {
    this.setState({
      objPosition: position,
    });
    this.setTimeout(() => {
      this._updateInitialRotation();
    }, 200);
  },

  // Update the rotation of the object to face the user after it's positioned.
  _updateInitialRotation() {
    this.arNodeRef.getTransformAsync().then((retDict) => {
      let rotation = retDict.rotation;
      let absX = Math.abs(rotation[0]);
      let absZ = Math.abs(rotation[2]);

      let yRotation = rotation[1];

      // If the X and Z aren't 0, then adjust the y rotation.
      if (absX > 1 && absZ > 1) {
        yRotation = 180 - yRotation;
      }

      this.setState({
        rotation: [0, yRotation, 0],
        shouldBillboard: false,
      });
    });
  },

  // Calculate distance between two vectors
  _distance(vectorOne, vectorTwo) {
    var distance = Math.sqrt(
      (vectorTwo[0] - vectorOne[0]) * (vectorTwo[0] - vectorOne[0]) +
        (vectorTwo[1] - vectorOne[1]) * (vectorTwo[1] - vectorOne[1]) +
        (vectorTwo[2] - vectorOne[2]) * (vectorTwo[2] - vectorOne[2]),
    );
    return distance;
  },

  _getStyle() {
    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'NotoSansCJK',
        fontSize: 10,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
      },
    });
    return styles.helloWorldTextStyle;
  },
});

module.exports = dandelionARScene;

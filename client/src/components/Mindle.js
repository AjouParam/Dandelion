import React from 'react';
import { Marker, Circle } from 'react-native-maps';

const Mindle = ({ latitude, longitude, radius, src, title, description, onPress, overlap }) => {
  return (
    <>
      <Circle
        center={{ latitude: latitude, longitude: longitude }}
        radius={radius}
        strokeWidth={1}
        strokeColor={overlap ? '#50BCDF' : '#00FF00'}
        fillColor={overlap ? 'rgba(184,248,251,0.3)' : 'rgba(144,238,144,0.3)'}
      />
      <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={title}
        description={description}
        onPress={onPress}
        image={src}
        centerOffset={{ x: 0.5, y: 0.55 }}
        anchor={{ x: 0.5, y: 0.55 }}
        calloutOffset={{ x: 0.5, y: 0.4 }}
        calloutAnchor={{ x: 0.5, y: 0.4 }}
      >
        {/* width,height로 크기 지정 */}
      </Marker>
    </>
  );
};

export default Mindle;

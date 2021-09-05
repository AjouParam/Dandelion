import React from 'react';
import { Marker, Circle } from 'react-native-maps';

const Mindle = ({ latitude, longitude, radius, src, title, description, onPress }) => {
  return (
    <>
      <Circle
        center={{ latitude: latitude, longitude: longitude }}
        radius={radius}
        strokeWidth={1}
        strokeColor={'#1a66ff'}
        fillColor={'rgba(230,238,255,0.5)'}
      />
      <Marker
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={title}
        description={description}
        onPress={onPress}
        image={src}
      >
        {/* width,height로 크기 지정 */}
      </Marker>
    </>
  );
};

export default Mindle;

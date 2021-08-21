import React from 'react';
import {View,Text} from 'react-native';
import Styled from 'styled-components/native';
import MapView from 'react-native-maps';

const Container = Styled.View`
    flex: 1;
`;
//37.283407677684785, 127.04333697407566 아주대학교
const maps=()=>{

    return(
        <Container>
             <MapView 
             style={{flex: 1}} 
             initialRegion={{
                latitude: 37.283407677684785,
                longitude: 127.04333697407566,
                latitudeDelta: 0.00422,
                longitudeDelta: 0.0031,
            }}
             />

        </Container>
    );

};

export default maps;
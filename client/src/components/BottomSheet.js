import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';

const BottomSheet = (props) => {
  const { modalVisible, setModalVisible } = props;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  // panY에 따라 BottomSheet의 y축 위치를 결정
  const translateY = panY.interpolate({
    // inputRage의 -1을 outputRage의 0으로 치환하기 때문에
    // panY가 0보다 작아져도 BottomSheet의 y축 위치에는 변화가 없다
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // BottomSheet를 초기 위치로 움직이는 함수
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 200,
    duration: 200,
    useNativeDriver: true,
  });

  // BottomSheet를 내리는 함수
  const closeBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,

      // BottomSheet에 터치 또는 드래그 이벤트가 발생할 때 실행
      onPanResponderMove: (event, gestureState) => {
        // 처음 터치 영역을 기준으로 y축으로 드래그한 거리를 panY에 저장
        panY.setValue(gestureState.dy);
      },

      // 유저가 BottomSheet 손을 뗐을 때 실행
      onPanResponderRelease: (event, gestureState) => {
        // 유저가 y축으로 1.5 이상의 속도로 드래그 했을 때 BottomSheet가 닫히도록 조건을 지정
        if (gestureState.dy > 0 && gestureState.vy > 1.2) {
          console.log(gestureState.moveY);
          closeModal();
        }

        // 위 조건에 부합하지 않으면 BottomSheet의 위치를 초기화
        else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    background: {
      flex: 1,
    },
    bottomSheetContainer: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{ ...styles.bottomSheetContainer, transform: [{ translateY: translateY }] }}
          {...panResponders.panHandlers}
        >
          <Text>This is BottomSheet</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};
export default BottomSheet;

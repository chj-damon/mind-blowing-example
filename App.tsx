import React, { FC, useState } from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { interpolateColor, useValue, withTransition } from 'react-native-redash';
import Animated, { Easing, interpolate, set, useCode } from 'react-native-reanimated';

const CIRCLE_SIZE = 100;

const Circle: FC<{ onPress: () => void; animatedValue: Animated.Node<number> }> = ({ onPress, animatedValue }) => {
  // const rotateY = interpolate(animatedValue, {
  //   inputRange: [0, 0.5, 1],
  //   outputRange: ['0deg', '-90deg', '-180deg'],
  // });

  // const scale = interpolate(animatedValue, {
  //   inputRange: [0, 0.5, 1],
  //   outputRange: [1, 8, 1],
  // });

  const translateX = interpolate(animatedValue, {
    inputRange: [0, 0.5, 1],
    outputRange: ['0%', '50%', '0%'],
  });

  // const containerBg = interpolateColor(animatedValue, {
  //   inputRange: [0, 0.001, 0.5, 0.501, 1],
  //   outputRange: ['gold', 'gold', 'gold', '#444', '#444'],
  // }) as any;

  // const circleBg = interpolateColor(animatedValue, {
  //   inputRange: [0, 0.001, 0.5, 0.501, 1],
  //   outputRange: ['#444', '#444', '#444', 'gold', 'gold'],
  // }) as any;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {
          // backgroundColor: containerBg,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            // backgroundColor: circleBg,
            transform: [
              // { perspective: 400 },
              // { rotateY },
              // { scale },
              { translateX },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AntDesign name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const [index, setIndex] = useState(1);
  const clicked = useValue<number>(0);
  const animatedValue = withTransition(clicked, { duration: 3000, easing: Easing.inOut(Easing.ease) });

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
  };

  useCode(() => [set(clicked, index === 1 ? 0 : 1)], [index]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: 'gold',
  },
  circle: {
    backgroundColor: '#444',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

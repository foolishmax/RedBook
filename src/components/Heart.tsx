import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, StyleSheet, TouchableOpacity} from 'react-native';

import iconHeader from '../assets/icon_heart.png';
import iconHeartEmpty from '../assets/icon_heart_empty.png';

type props = {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  size?: number;
};

export default function Heart({value, onValueChange, size = 20}: props) {
  const [actived, setActived] = useState<boolean>(false);
  const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
  const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    setActived(value);
  }, [value]);

  // 点击动画
  const onHeartPress = () => {
    const newState = !actived;
    setActived(newState);
    onValueChange?.(newState);
    if (newState) {
      alpha.setValue(1);
      const scaleAnim = Animated.timing(scale, {
        toValue: 1.8,
        duration: 300,
        useNativeDriver: false,
      });
      const alphaAnim = Animated.timing(alpha, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay: 200,
      });
      Animated.parallel([scaleAnim, alphaAnim]).start(); // 同步执行
    } else {
      scale.setValue(0);
    }
  };

  return (
    <TouchableOpacity onPress={onHeartPress}>
      <Image
        style={[styles.container, {width: size, height: size}]}
        source={actived ? iconHeader : iconHeartEmpty}
      />
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 20,
          position: 'absolute',
          borderColor: '#ff2442',
          transform: [{scale}],
          opacity: alpha,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  LayoutAnimation,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SliderMenuContent from './SliderMenuContent';

export interface SliderMenuRef {
  show: () => void;
  hide: () => void;
}

export default forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const show = () => {
    setVisible(true);
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setOpen(true);
    }, 100);
  };

  const hide = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(false);

    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={hide}>
      <TouchableOpacity style={styles.root} onPress={hide} activeOpacity={1}>
        <SliderMenuContent open={open} hide={hide} />
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000c0',
  },
});

import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import SliderMenu, {SliderMenuRef} from './SliderMenu';

import {useRef} from 'react';
import icon_menu from '../../assets/icon_menu.png';
import icon_share from '../../assets/icon_share.png';
import icon_shop_car from '../../assets/icon_shop_car.png';

export default function MineHeader() {
  const ref = useRef<SliderMenuRef>(null);
  return (
    <View style={styles.headerLayout}>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => {
          ref.current?.show();
        }}>
        <Image source={icon_menu} style={styles.menuImg} />
      </TouchableOpacity>
      <View style={{flex: 1}} />
      <Image
        style={[styles.menuImg, styles.rightMenuImg]}
        source={icon_shop_car}
      />
      <Image
        style={[styles.menuImg, styles.rightMenuImg]}
        source={icon_share}
      />
      <SliderMenu ref={ref} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  menuImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  rightMenuImg: {
    marginHorizontal: 12,
    tintColor: 'white',
  },
});

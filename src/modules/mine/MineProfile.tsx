import {observer} from 'mobx-react';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useStore from '../../stores';

import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_setting from '../../assets/icon_setting.png';

interface MineProfileProps {
  onHeightChange: (height: number) => void;
}

export default observer(function MineProfile(props: MineProfileProps) {
  const {onHeightChange} = props;
  const {userInfo} = useStore().userStore;

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        const {height} = e.nativeEvent.layout;
        onHeightChange(height);
      }}>
      <View style={styles.avatarLayout}>
        <Image source={{uri: userInfo.avatar}} style={styles.avatarImg} />
        <Image source={icon_add} style={styles.avatarAdd} />
        <View style={styles.nameLayout}>
          <Text style={styles.nameTxt}>{userInfo.username}</Text>
          <View style={styles.countLayout}>
            <Text style={styles.countTxt}>小红书号：1282393649</Text>
            <Image style={styles.qrcodeImg} source={icon_qrcode} />
          </View>
        </View>
      </View>
      <Text style={styles.descTxt}>点击这里，填写简介</Text>
      <View style={styles.sexWrapper}>
        <Image style={styles.sexImg} source={icon_male} />
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>14</Text>
          <Text style={styles.infoLabel}>关注</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>38</Text>
          <Text style={styles.infoLabel}>粉丝</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoValue}>880</Text>
          <Text style={styles.infoLabel}>获赞与收藏</Text>
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.infoBtn}>
          <Text style={styles.editTxt}>编辑资料</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoBtn}>
          <Image style={styles.settingImg} source={icon_setting} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  avatarLayout: {
    width: '100%',
    height: 130,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  avatarImg: {
    width: 96,
    height: 96,
    resizeMode: 'cover',
    borderRadius: 48,
  },
  avatarAdd: {
    width: 20,
    height: 20,
    marginLeft: -28,
    marginBottom: 2,
  },
  nameLayout: {
    height: '100%',
    marginLeft: 20,
    justifyContent: 'center',
  },
  nameTxt: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  countLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  countTxt: {
    fontSize: 12,
    color: '#bbb',
  },
  qrcodeImg: {
    width: 12,
    height: 12,
    marginLeft: 6,
    tintColor: '#bbb',
  },
  descTxt: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: 'white',
  },
  sexWrapper: {
    width: 32,
    height: 24,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff50',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 16,
  },
  sexImg: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  info: {
    width: '100%',
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  infoItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoValue: {
    fontSize: 16,
    color: 'white',
  },
  infoLabel: {
    fontSize: 12,
    color: '#ddd',
    marginTop: 6,
  },
  infoBtn: {
    height: 32,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    backgroundColor: '#ffffff10',
  },
  editTxt: {
    fontSize: 14,
    color: '#fff',
  },
  settingImg: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

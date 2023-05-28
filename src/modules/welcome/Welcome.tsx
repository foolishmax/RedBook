import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import icon_logo_main from '../../assets/icon_main_logo.png';
import useStore from '../../stores';
import {load} from '../../utils';

export default observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {setUserInfo} = useStore().userStore;

  useEffect(() => {
    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  const checkUser = async () => {
    const cacheUser = await load('userInfo');

    if (cacheUser) {
      setUserInfo(cacheUser);
      jumpHome();
    } else {
      jumpLogin();
    }
  };

  const jumpLogin = () => {
    navigation.replace('Login');
  };
  const jumpHome = () => {
    navigation.replace('MainTab');
  };

  return (
    <View style={styles.root}>
      <Image source={icon_logo_main} style={styles.logo_main} />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 100,
    marginTop: 200,
    resizeMode: 'contain',
  },
});

import {useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_close_modal from '../../assets/icon_close_modal.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_selected from '../../assets/icon_selected.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import UserStore from '../../stores/UserStore';
import {formatPhone, replaceBlank} from '../../utils/stringUtil';

type LoginType = 'quick' | 'input';

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('quick');
  const [protocolChecked, setProtocolChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<any>>();

  const canLogin =
    phone.length === 13 && password.length >= 6 && password.length <= 16;
  const onLogin = async () => {
    if (!canLogin || !protocolChecked) {
      return;
    }
    const purePhone = replaceBlank(phone);
    UserStore.login(purePhone, password, (success: boolean) => {
      if (success) {
        navigation.replace('HomeTab');
      } else {
        ToastAndroid.show('登陆失败，请检查手机号和密码', ToastAndroid.LONG);
      }
    });
  };

  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 56,
        backgroundColor: 'white',
        flexDirection: 'column-reverse',
        alignItems: 'center',
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
        transform: [{rotate: '180deg'}],
      },
      wxLogin: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        justifyContent: 'center',
        borderRadius: 28,
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxTxt: {
        fontSize: 20,
        color: 'white',
      },
      oneKeyLogin: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        borderRadius: 28,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
      },
      logo_main: {
        width: 180,
        height: 96,
        resizeMode: 'contain',
        position: 'absolute',
        top: 160,
      },
    });
    return (
      <View style={styles.root}>
        <View style={allStyles.protocol}>
          <TouchableOpacity
            onPress={() => {
              setProtocolChecked(!protocolChecked);
            }}>
            <Image
              style={allStyles.radio}
              source={protocolChecked ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={allStyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allStyles.protocolTxt}>
              《用户协议》和《隐私政策》《儿童/青
            </Text>
            <Text style={[allStyles.protocolTxt, allStyles.protocolRestTxt]}>
              少年个人信息保护规则》《中国移动认证服务条款》
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
          }}>
          <Text style={styles.otherLoginTxt}>其他登陆方式</Text>
          <Image source={icon_arrow} style={styles.icon_arrow} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wxLogin}
          activeOpacity={0.7}
          onPress={() => {
            console.log('onpress');
          }}>
          <Image source={icon_wx_small} style={styles.icon_wx} />
          <Text style={styles.wxTxt}>微信登陆</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.oneKeyLogin}
          activeOpacity={0.7}
          onPress={() => {
            console.log('onpress');
          }}>
          <Text style={styles.wxTxt}>一键登陆</Text>
        </TouchableOpacity>
        <Image source={icon_logo_main} style={styles.logo_main} />
      </View>
    );
  };

  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 36,
        paddingTop: 60,
      },
      title: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 20,
      },
      tips: {
        fontSize: 12,
        color: '#bbb',
        marginTop: 8,
      },
      phone: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        marginTop: 20,
      },
      phonePrefix: {
        fontSize: 24,
        color: '#bbb',
      },
      triangle: {
        width: 16,
        height: 8,
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        fontSize: 24,
        color: '#333',
        marginLeft: 4,
      },
      password: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        marginTop: 8,
      },
      passwordInput: {
        flex: 1,
        fontSize: 24,
        color: '#333',
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
      },
      change: {
        flexDirection: 'row',
        marginTop: 10,
      },
      exchangeIcon: {
        width: 20,
        height: 20,
      },
      code: {
        color: '#303080',
        flex: 1,
        marginLeft: 6,
      },
      forgetPwd: {
        color: '#303080',
      },
      loginBtn: {
        width: '100%',
        height: 56,
        marginTop: 20,
        backgroundColor: '#ff2442',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
      },
      loginBtnDisable: {
        width: '100%',
        height: 56,
        marginTop: 20,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
      },
      loginTxt: {
        color: 'white',
        fontSize: 20,
      },
      wxqq: {
        width: '100%',
        paddingHorizontal: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
      },
      wx: {
        width: 50,
        height: 50,
      },
      qq: {
        width: 50,
        height: 50,
      },
      closeBtn: {
        position: 'absolute',
        top: 20,
        left: 30,
      },
      closeImg: {
        width: 30,
        height: 30,
      },
    });

    return (
      <View style={styles.root}>
        <Text style={styles.title}>密码登陆</Text>
        <Text style={styles.tips}>未注册的手机号登录成功后将自动注册</Text>
        <View style={styles.phone}>
          <Text style={styles.phonePrefix}>+ 86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholderTextColor="#bbb"
            placeholder="请输入手机号码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={13}
            value={phone}
            onChangeText={text => {
              setPhone(formatPhone(text));
            }}
          />
        </View>
        <View style={styles.password}>
          <TextInput
            style={styles.passwordInput}
            placeholder="请输入密码"
            placeholderTextColor="#bbb"
            autoFocus={false}
            maxLength={16}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}>
            <Image
              style={styles.iconEye}
              source={passwordVisible ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.change}>
          <Image source={icon_exchange} style={styles.exchangeIcon} />
          <Text style={styles.code}>验证码登录</Text>
          <Text style={styles.forgetPwd}>忘记密码？</Text>
        </View>
        <TouchableOpacity
          activeOpacity={canLogin ? 0.7 : 1}
          style={canLogin ? styles.loginBtn : styles.loginBtnDisable}
          onPress={onLogin}>
          <Text style={styles.loginTxt}>登陆</Text>
        </TouchableOpacity>
        <View style={allStyles.protocol}>
          <TouchableOpacity
            onPress={() => {
              setProtocolChecked(!protocolChecked);
            }}>
            <Image
              style={allStyles.radio}
              source={protocolChecked ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={allStyles.labelTxt}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={allStyles.protocolTxt}>
              《用户协议》和《隐私政策》《儿童/青
            </Text>
            <Text style={[allStyles.protocolTxt, allStyles.protocolRestTxt]}>
              少年个人信息保护规则》《中国移动认证服务条款》
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wxqq}>
          <Image source={icon_wx} style={styles.wx} />
          <Image source={icon_qq} style={styles.qq} />
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick');
          }}>
          <Image source={icon_close_modal} style={styles.closeImg} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={allStyles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

const allStyles = StyleSheet.create({
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
  protocol: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 40,
    marginTop: 12,
  },
  radio: {
    width: 20,
    height: 20,
  },
  labelTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff',
  },
  protocolRestTxt: {
    marginLeft: -84,
  },
});

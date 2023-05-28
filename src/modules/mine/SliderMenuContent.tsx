import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_scan from '../../assets/icon_scan.png';
import icon_service from '../../assets/icon_service.png';
import icon_setting from '../../assets/icon_setting.png';

import {useCallback} from 'react';
import icon_browse_histroy from '../../assets/icon_browse_history.png';
import icon_community from '../../assets/icon_community.png';
import icon_coupon from '../../assets/icon_coupon.png';
import icon_create_center from '../../assets/icon_create_center.png';
import icon_draft from '../../assets/icon_draft.png';
import icon_exit from '../../assets/icon_exit.png';
import icon_fid_user from '../../assets/icon_find_user.png';
import icon_free_net from '../../assets/icon_free_net.png';
import icon_nice_goods from '../../assets/icon_nice_goods.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_packet from '../../assets/icon_packet.png';
import icon_red_vip from '../../assets/icon_red_vip.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_wish from '../../assets/icon_wish.png';
import {remove} from '../../utils';

const MENUS = [
  [{icon: icon_fid_user, name: '发现好友'}],
  [
    {icon: icon_draft, name: '我的草稿'},
    {icon: icon_create_center, name: '创作中心'},
    {icon: icon_browse_histroy, name: '浏览记录'},
    {icon: icon_packet, name: '钱包'},
    {icon: icon_free_net, name: '免流量'},
    {icon: icon_nice_goods, name: '好物体验'},
  ],
  [
    {icon: icon_orders, name: '订单'},
    {icon: icon_shop_car, name: '购物车'},
    {icon: icon_coupon, name: '卡券'},
    {icon: icon_wish, name: '心愿单'},
    {icon: icon_red_vip, name: '小红书会员'},
  ],
  [
    {icon: icon_community, name: '社区公约'},
    {icon: icon_exit, name: '退出登陆'},
  ],
];

const BOTTOM_MENUS = [
  {icon: icon_setting, txt: '设置'},
  {icon: icon_service, txt: '帮助与客服'},
  {icon: icon_scan, txt: '扫一扫'},
];

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ContentWidth = SCREEN_WIDTH * 0.75;

interface SliderMenuContentProps {
  open: boolean;
  hide: () => void;
}

export default function SliderMenuContent(props: SliderMenuContentProps) {
  const {open, hide} = props;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onMenuItemPress = useCallback(
    (item: any) => async () => {
      if (item.name === '退出登陆') {
        hide();
        await remove('userInfo');
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    },
    [],
  );

  return (
    <View style={[styles.content, {marginLeft: open ? 0 : -ContentWidth}]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {MENUS.map((item, index) => {
          return (
            <View key={`${index}`}>
              {item.map((subItem, subIndex) => {
                return (
                  <TouchableOpacity
                    key={`${index}-${subIndex}`}
                    style={styles.menuItem}
                    onPress={onMenuItemPress(subItem)}>
                    <Image style={styles.menuItemIcon} source={subItem.icon} />
                    <Text style={styles.menuItemTxt}>{subItem.name}</Text>
                  </TouchableOpacity>
                );
              })}

              {index !== MENUS.length - 1 && <View style={styles.divideLine} />}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.bottomWrapper}>
        {BOTTOM_MENUS.map(item => (
          <TouchableOpacity key={item.txt} style={styles.bottomItem}>
            <View style={styles.bottomItemImgWrapper}>
              <Image source={item.icon} style={styles.bottomItemImg} />
            </View>
            <Text style={styles.bottomItemTxt}>{item.txt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: ContentWidth,
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  bottomWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 20,
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomItemImgWrapper: {
    width: 46,
    height: 46,
    backgroundColor: '#f0f0f0',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomItemImg: {
    width: 26,
    height: 26,
  },
  bottomItemTxt: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  menuItem: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  menuItemTxt: {
    fontSize: 16,
    color: '#333',
    marginLeft: 14,
  },
  divideLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
  container: {
    paddingTop: 72,
    paddingHorizontal: 28,
    paddingBottom: 12,
  },
});

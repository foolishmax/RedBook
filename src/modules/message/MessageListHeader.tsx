import {Image, StyleSheet, Text, View} from 'react-native';
import UnRead from './UnRead';

import {observer} from 'mobx-react';
import icon_comments from '../../assets/icon_comments.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_star from '../../assets/icon_star.png';
import useStore from '../../stores';

export default observer(function MessageListHeader() {
  const {unRead} = useStore().messageStore;

  return (
    <View style={styles.headerLayout}>
      <View style={styles.headerItem}>
        <View>
          <Image style={styles.itemImg} source={icon_star} />
          {!!unRead?.unreadFavorate && (
            <UnRead count={unRead?.unreadFavorate} />
          )}
        </View>
        <Text style={styles.itemTxt}>赞和收藏</Text>
      </View>
      <View style={styles.headerItem}>
        <View>
          <Image style={styles.itemImg} source={icon_new_follow} />
          {!!unRead?.newFollow && <UnRead count={unRead?.newFollow} />}
        </View>
        <Text style={styles.itemTxt}>新增关注</Text>
      </View>
      <View style={styles.headerItem}>
        <View>
          <Image style={styles.itemImg} source={icon_comments} />
          {!!unRead?.comment && <UnRead count={unRead?.comment} />}
        </View>
        <Text style={styles.itemTxt}>评论和@</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  headerLayout: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  itemImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemTxt: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});

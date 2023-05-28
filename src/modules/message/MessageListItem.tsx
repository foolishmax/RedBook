import {Image, StyleSheet, Text, View} from 'react-native';

import icon_to_top from '../../assets/icon_to_top.png';

export default function MessageListItem({item}: {item: MessageListItem}) {
  return (
    <View style={styles.item}>
      <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
      <View style={styles.contentLayout}>
        <Text style={styles.nameTxt}>{item.name}</Text>
        <Text style={styles.lastMessageTxt}>{item.lastMessage}</Text>
      </View>
      <View style={styles.rightLayout}>
        <Text style={styles.timeTxt}>{item.lastMessageTime}</Text>
        <Image style={styles.iconTop} source={icon_to_top} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  nameTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  lastMessageTxt: {
    fontSize: 15,
    color: '#999',
    marginTop: 4,
  },
  rightLayout: {
    alignItems: 'flex-end',
  },
  timeTxt: {
    fontSize: 12,
    color: '#999',
  },
  iconTop: {
    width: 8,
    height: 16,
    marginTop: 6,
    resizeMode: 'contain',
  },
});

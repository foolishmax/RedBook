import {observer} from 'mobx-react';
import {useEffect, useRef} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useStore from '../../stores';

import icon_group from '../../assets/icon_group.png';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import Empty from '../../components/Empty';
import FloatMenu, {FloatMenuRef} from './FloatMenu';
import MessageListHeader from './MessageListHeader';
import MessageListItem from './MessageListItem';

export default observer(() => {
  const {getUnRead, getMessagesList, messagesList, unRead} =
    useStore().messageStore;

  const ref = useRef<FloatMenuRef>(null);

  useEffect(() => {
    getMessagesList();
    getUnRead();
  }, []);

  const renderTitle = () => {
    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.messageTxt}>消息</Text>
        <TouchableOpacity
          style={styles.titleBtn}
          onPress={(event: GestureResponderEvent) => {
            const {pageY} = event.nativeEvent;
            ref.current?.show(pageY + 48);
          }}>
          <Image source={icon_group} style={styles.iconGroupImg} />
          <Text style={styles.groupTxt}>群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{flex: 1}}
        data={messagesList}
        extraData={[unRead]}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({item}) => <MessageListItem item={item} />}
        ListHeaderComponent={<MessageListHeader />}
        ListEmptyComponent={<Empty icon={icon_no_collection} tips="暂无消息" />}
      />
      <FloatMenu ref={ref} />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titleWrapper: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageTxt: {
    fontSize: 18,
    color: '#333',
  },
  titleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
  iconGroupImg: {
    width: 16,
    height: 16,
  },
  groupTxt: {
    fontSize: 14,
    marginLeft: 6,
  },
});

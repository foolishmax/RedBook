import {observer} from 'mobx-react';
import {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import icon_heart from '../../assets/icon_heart.png'
import icon_heart_empty from '../../assets/icon_heart_empty.png';
import useStore from '../../stores';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const {getHomeList, homeList, refreshing, resetPage} = useStore().homeStore;

  useEffect(() => {
    getHomeList();
  }, []);

  const onRefresh = () => {
    console.log('onrefresh');
    resetPage();
    getHomeList();
  };

  const Footer = () => <Text style={styles.footerTxt}>没有更多数据</Text>;

  const renderItem: ListRenderItem<ArticleSimple> = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.imageContent} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameWrapper}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Image style={styles.heart} source={icon_heart_empty} />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.flatList}
        data={homeList}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={getHomeList}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 6,
  },
  item: {
    // eslint-disable-next-line no-bitwise
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: '#fff',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContent: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  nameWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    marginLeft: 4,
    color: '#999',
  },
  footerTxt: {
    width: '100%',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 12,
  },
});

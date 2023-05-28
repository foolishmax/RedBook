import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FlowList from '../../components/FlowList/FlowList';
import Heart from '../../components/Heart';
import ResizeImage from '../../components/ResizeImage';
import useStore from '../../stores';
import CategoryList from './CategoryList';

import TabBar from './TabBar';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const {
    getHomeList,
    homeList,
    refreshing,
    resetPage,
    getCategoryList,
    categoryList,
  } = useStore().homeStore;
  const {getArticleDetail} = useStore().articleStore;
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    getHomeList();
    getCategoryList();
  }, []);

  const onRefresh = () => {
    resetPage();
    getHomeList();
  };

  const Footer = () => <Text style={styles.footerTxt}>没有更多数据</Text>;

  const onArticlePress = (_article: ArticleSimple) => {
    navigation.push('ArticleView');
    getArticleDetail(_article.id);
    // getArticleDetail(_article.id,{id: _article.id}); //穿参方式
  };

  const renderItem: ListRenderItem<ArticleSimple> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onArticlePress(item)}>
        <ResizeImage uri={item.image} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameWrapper}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart value={item.isFavorite} />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <TabBar
        tab={1}
        onTabChange={tab => {
          console.log(tab);
        }}
      />
      <FlowList
        style={styles.flatList}
        keyExtrator={(item: ArticleSimple) => `${item.id}`}
        data={homeList}
        renderItem={renderItem}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={getHomeList}
        stickyHeaderIndices={[0]}
        ListFooterComponent={<Footer />}
        ListHeaderComponent={
          <CategoryList
            categoryList={categoryList}
            onCategoryChange={value => {
              console.log(value);
            }}
          />
        }
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
  item: {
    // eslint-disable-next-line no-bitwise
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: '#fff',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
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

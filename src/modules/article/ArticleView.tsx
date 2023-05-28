// import {RouteProp, useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import ImageSlider, {type DataType} from '../../components/slidePager';
import useStore from '../../stores';
import BottomView from './BottomView';
import CommentView from './CommentView';
import useArticle from './useArticle';

// type RouteParams = {
//   ArticleView: {
//     id: number;
//   };
// };

const {width: screenWidth} = Dimensions.get('window');

export default observer(function ArticleView() {
  // const {params} = useRoute<RouteProp<RouteParams, 'ArticleView'>>();
  // // 接受参数方式
  // console.log('params', params.id);
  const {article} = useStore().articleStore;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {articleImages, articleTags} = useArticle();
  // 图片轮播高度， 默认高度400
  const [imgHeight, setImgHeight] = useState<number>(400);

  // 图片高度计算
  useEffect(() => {
    // 数组长度大于0才行
    if (articleImages?.length) {
      // 拿到第一张图片
      const img = articleImages[0].img;
      Image.getSize(img, (width, height) => {
        const showHeight = (screenWidth * height) / width;
        setImgHeight(showHeight);
      });
    }
  }, [articleImages]);

  const renderTitle = () => {
    return (
      <View style={styles.titleWrapper}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backBtn}>
          <Image source={icon_arrow} style={styles.backImg} />
        </TouchableOpacity>
        <Image source={{uri: article.avatarUrl}} style={styles.avatarImg} />
        <Text style={styles.username}>{article.userName}</Text>
        <Text style={styles.star}>关注</Text>
        <Image source={icon_share} style={styles.shareImg} />
      </View>
    );
  };

  const renderImages = () => {
    const {images = []} = article;
    if (!images.length) {
      return null;
    }
    return (
      <View style={{paddingBottom: 30}}>
        <ImageSlider
          data={articleImages as DataType[]}
          autoPlay={false}
          closeIconColor={'white'}
          caroselImageStyle={{height: imgHeight}}
          indicatorContainerStyle={{bottom: -40}}
          activeIndicatorStyle={styles.activeDot} // 选中图片
          inActiveIndicatorStyle={styles.inActiveDot} // 未选中图片
        />
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View>
        <Text style={styles.articleTitleTxt}>{article.title}</Text>
        <Text style={styles.descTxt}>{article.desc}</Text>
        <Text style={styles.tagTxt}>{articleTags}</Text>
        <Text style={styles.timeTxt}>
          {article.dateTime}
          {article.location}
        </Text>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {renderImages()}
        {renderInfo()}
        <CommentView article={article} />
      </ScrollView>
      <BottomView article={article} />
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  backImg: {
    width: 20,
    height: 20,
  },
  avatarImg: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  username: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 16,
  },
  star: {
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ff2442',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#ff2442',
  },
  shareImg: {
    width: 28,
    height: 28,
    marginLeft: 16,
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff2442',
    borderRadius: 3,
  },
  inActiveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#c0c0c0',
    borderRadius: 3,
  },
  articleTitleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  descTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  tagTxt: {
    fontSize: 14,
    color: '#305090',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  timeTxt: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },
});

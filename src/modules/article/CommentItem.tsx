import dayjs from 'dayjs';
import {observer} from 'mobx-react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Heart from '../../components/Heart';
const {width: screenWidth} = Dimensions.get('window');

interface CommentViewProps {
  comment: ArticleComment;
  children?: ArticleComment[];
  isLeaf?: boolean;
}

export default observer(function CommentView(props: CommentViewProps) {
  const {comment, children, isLeaf} = props;

  return (
    <View>
      <View
        style={[
          styles.commentItem,
          {
            marginTop: isLeaf ? 12 : 0,
            width: isLeaf ? screenWidth - 80 : '100%',
          },
        ]}>
        <Image source={{uri: comment.avatarUrl}} style={styles.avatarImg} />
        <View style={styles.contentLayout}>
          <Text style={styles.nameTxt}>{comment.userName}</Text>
          <Text style={styles.messageTxt}>
            {comment.message}
            {'   '}
            <Text style={styles.timeLocationTxt}>
              {dayjs(comment.dateTime).format('MM-DD')} {comment.location}
            </Text>
          </Text>
          {children?.map((item, index) => (
            <CommentView comment={item} key={index} isLeaf={true} />
          ))}
        </View>
        <View style={styles.countLayout}>
          <Heart size={20} value={comment.isFavorite} />
          <Text style={styles.fCount}>{comment.favoriteCount}</Text>
        </View>
      </View>
      {children?.length && <View style={styles.divider} />}
    </View>
  );
});

const styles = StyleSheet.create({
  commentItem: {
    flexDirection: 'row',
    width: '100%',
  },
  avatarImg: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
  },
  messageTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  timeLocationTxt: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 10,
  },
  countLayout: {
    alignItems: 'center',
  },
  fCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    marginLeft: 50,
    marginRight: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
});

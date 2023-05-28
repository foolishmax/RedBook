import {observer} from 'mobx-react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import useStore from '../../stores';
import CommentItem from './CommentItem';

interface CommentViewProps {
  article: Article;
}

export default observer(function CommentView(props: CommentViewProps) {
  const {article} = props;
  const {userInfo} = useStore().userStore;

  const count = article.comments?.length || 0;
  return (
    <View>
      <Text style={styles.countTxt}>
        {count > 0 ? `共${article.comments?.length}条评论` : '暂无评论'}
      </Text>
      <View style={styles.inputWrapper}>
        <Image source={{uri: userInfo.avatar}} style={styles.userAvatarImg} />
        <TextInput
          style={styles.commentInput}
          placeholder="说一点什么吧"
          placeholderTextColor="#ccc"
        />
      </View>
      {!!count && (
        <View style={styles.commentContent}>
          {article.comments?.map((item: ArticleComment, index: number) => {
            return (
              <CommentItem
                comment={item}
                children={item.children}
                key={index}
              />
            );
          })}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  countTxt: {
    paddingHorizontal: 16,
    marginVertical: 16,
    fontSize: 14,
    color: '#999',
  },
  inputWrapper: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
  },
  commentInput: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
    backgroundColor: '#f0f0f0',
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  commentContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});

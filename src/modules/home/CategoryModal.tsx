import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {save} from '../../utils';
import CategoryModalMyList from './CategoryModalMyList';
import CategoryModalOtherList from './CategoryModalOtherList';

const {width} = Dimensions.get('window');

interface CategoryModalProps {
  categoryList: Category[];
}

export interface CategoryModalRef {
  show: () => void;
  hide: () => void;
}

export default forwardRef(function CategoryModal(
  props: CategoryModalProps,
  ref,
) {
  const {categoryList} = props;
  const [visible, setVisible] = useState(false);
  const [myList, setMyList] = useState<Category[]>([]);
  const [otherList, setOtherList] = useState<Category[]>([]);
  const [edit, setEdit] = useState<boolean>(false);

  // 初始化频道数据
  useEffect(() => {
    const tempMyList = categoryList.filter(i => i.isAdd);
    setMyList(tempMyList);
    const tempOtherList = categoryList.filter(i => !i.isAdd);
    setOtherList(tempOtherList);
  }, [categoryList]);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  // 向我的频道添加数据
  const onOtherItemPress = useCallback(
    (item: Category) => () => {
      LayoutAnimation.easeInEaseOut();
      setOtherList(n => n.filter(i => i.name !== item.name));
      setMyList(n => [...n, {...item, isAdd: true}]);
    },
    [myList, otherList],
  );

  // 移除我的频道的数据
  const onMyItemPress = useCallback(
    (item: Category) => () => {
      LayoutAnimation.easeInEaseOut();
      setMyList(n => n.filter(i => i.name !== item.name));
      setOtherList(n => [...n, {...item, isAdd: false}]);
    },
    [],
  );

  // 储存数据
  const saveList = useCallback(() => {
    save('categoryList', JSON.stringify([...myList, ...otherList]));
    // 更新store中的数据
  }, [myList, otherList]);

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType="fade"
      onRequestClose={hide}>
      <View style={styles.root}>
        <View style={styles.content}>
          <CategoryModalMyList
            myList={myList}
            onMyItemPress={onMyItemPress}
            hide={hide}
            saveList={saveList}
            edit={edit}
            setEdit={setEdit}
          />
          <CategoryModalOtherList
            otherList={otherList}
            onOtherItemPress={onOtherItemPress}
            edit={edit}
          />
        </View>
        <View style={styles.mask} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 48,
    paddingBottom: 40,
  },
  mask: {
    width: '100%',
    flex: 1,
    backgroundColor: '#00000060',
  },
});

export const allStyles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
    flex: 1,
  },
  editBtn: {
    paddingHorizontal: 10,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTxt: {
    fontSize: 13,
    color: '#3050ff',
  },
  closeBtn: {
    padding: 12,
  },
  closeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemLayout: {
    width: (width - 80) / 4,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12,
  },
  itemLayoutDefault: {
    width: (width - 80) / 4,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
    borderRadius: 6,
    marginLeft: 16,
    marginTop: 12,
  },
  itemTxt: {
    fontSize: 16,
    color: '#666',
  },
  deleteImg: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -6,
    right: -6,
  },
});

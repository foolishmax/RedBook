import {useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryModal, {CategoryModalRef} from './CategoryModal';

import iconArrow from '../../assets/icon_arrow.png';

interface CategoryListProps {
  categoryList: Category[];
  onCategoryChange: (value: Category) => void;
}

export default function CategoryList(props: CategoryListProps) {
  const {categoryList, onCategoryChange} = props;
  const [activeKey, setActiveKey] = useState('推荐');
  const modalRef = useRef<CategoryModalRef>();

  const onCategoryPress = (category: Category) => {
    setActiveKey(category.name);
    onCategoryChange?.(category);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {categoryList
          .filter(c => c.isAdd)
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => onCategoryPress(item)}>
              <Text
                style={
                  activeKey === item.name
                    ? styles.tabItemTxtSelected
                    : styles.tabItemTxt
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => {
          modalRef.current?.show();
        }}>
        <Image source={iconArrow} style={styles.img} />
      </TouchableOpacity>
      <CategoryModal ref={modalRef} categoryList={categoryList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  arrow: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 20,
    height: 20,
    transform: [{rotate: '-90deg'}],
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemTxtSelected: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

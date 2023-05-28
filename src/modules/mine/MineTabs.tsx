import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type TabBarProps = {
  tab: number;
  onTabChange: (tabIndex: number) => void;
};

export default function MineTabs({tab, onTabChange}: TabBarProps) {
  const arr = ['笔记', '收藏', '赞过'];
  return (
    <View style={styles.titleLayout}>
      {arr.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.tabBtn}
            onPress={() => {
              onTabChange(index);
            }}
            key={index}>
            <Text style={tab === index ? styles.tabTxtSelected : styles.tabTxt}>
              {item}
            </Text>
            {tab === index && <View style={styles.line} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6,
  },
  tabBtn: {
    paddingHorizontal: 14,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333',
  },
});

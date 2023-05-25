import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import iconDaily from '../../assets/icon_daily.png';
import iconSearch from '../../assets/icon_search.png';

type TabBarProps = {
  tab: number;
  onTabChange: (tabIndex: number) => void;
};

export default function TabBar({tab, onTabChange}: TabBarProps) {
  const arr = ['关注', '发现', '上海'];

  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    setTabIndex(tab);
  }, [tab]);

  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyBtn}>
        <Image style={styles.icon} source={iconDaily} />
      </TouchableOpacity>

      {arr.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.tabBtn}
            onPress={() => {
              setTabIndex(index);
              onTabChange(index);
            }}
            key={index}>
            <Text
              style={
                tabIndex === index ? styles.tabTxtSelected : styles.tabTxt
              }>
              {item}
            </Text>
            {tabIndex === index && <View style={styles.line} />}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.searchBtn}>
        <Image style={styles.icon} source={iconSearch} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  dailyBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    marginRight: 42,
  },
  searchBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    marginLeft: 42,
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
    flex: 1,
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

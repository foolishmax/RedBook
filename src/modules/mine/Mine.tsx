import {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import icon_mine_bg from '../../assets/icon_mine_bg.png';
import Loading from '../../components/widget/Loading';
import MineContent from './MineContent';
import MineHeader from './MineHeader';
import MineProfile from './MineProfile';
import MineTabs from './MineTabs';

export default () => {
  const [bgHeight, setBgHeight] = useState(400);
  const [tabIndex, setTabIndex] = useState(1);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    Loading.show();
    setTimeout(() => {
      setRefreshing(false);
      Loading.hide();
    }, 1000);
  }, []);

  return (
    <View style={styles.root}>
      <Image
        source={icon_mine_bg}
        style={[
          styles.mineBg,
          {
            height: bgHeight + 48 + 16,
          },
        ]}
      />
      <MineHeader />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
        }>
        <MineProfile onHeightChange={height => setBgHeight(height)} />
        <MineTabs
          tab={tabIndex}
          onTabChange={tab => {
            setTabIndex(tab);
          }}
        />
        <MineContent tab={tabIndex} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  mineBg: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
});

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import iconTabPublish from '../../assets/icon_tab_publish.png';

export default function TabBarIcon(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;
  const {routes, index} = state;

  const onPublish = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      (res: ImagePickerResponse) => {
        const {assets} = res;
        if (!assets?.length) {
          return;
        }
        const {uri, width, height, fileName, fileSize, type} = assets[0];
        console.log(
          `uri=${uri},width=${width}
          ,height=${height}
          ,fileName=${fileName}
          ,fileSize=${fileSize}
          ,type=${type}`,
        );
      },
    );
  };

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route, idx) => {
        const {options} = descriptors[route.key];
        const actived = index === idx;
        if (idx === 2) {
          return (
            <TouchableOpacity
              key={options.title}
              style={styles.tabItem}
              onPress={onPublish}>
              <Image style={styles.publishImg} source={iconTabPublish} />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            style={styles.tabItem}
            key={options.title}
            onPress={() => {
              navigation.navigate(route.name);
            }}>
            <Text
              style={{
                fontSize: actived ? 16 : 14,
                color: actived ? '#333' : '#999',
                fontWeight: actived ? 'bold' : 'normal',
              }}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishImg: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});

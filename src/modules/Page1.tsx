import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const onButtonPress = () => {
    navigation.push('PageB');
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Page1</Text>
      <Button title="点击跳转" onPress={onButtonPress} />
    </View>
  );
};

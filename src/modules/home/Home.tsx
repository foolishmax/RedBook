import {StyleSheet, Text, View} from 'react-native';

export default () => {
  return (
    <View style={styles.root}>
      <Text>home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

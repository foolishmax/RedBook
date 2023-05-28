import {StyleSheet, Text} from 'react-native';

export default function ({count}: {count: number}) {
  return <Text style={styles.txt}>{count > 99 ? '99+' : count}</Text>;
}

const styles = StyleSheet.create({
  txt: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#ff2442',
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: 'white',
  },
});

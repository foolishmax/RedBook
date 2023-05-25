import AsyncStorage from '@react-native-async-storage/async-storage';

export const save = async (key: string, value: any) => {
  try {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    return await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.error(e);
  }
};

export const load = async (key: string) => {
  try {
    const data = (await AsyncStorage.getItem(key)) || '{}';
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const remove = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const clear = async () => {
  try {
    AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

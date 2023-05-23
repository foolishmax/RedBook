import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Page1 from './src/modules/Page1';
import Page2 from './src/modules/Page2';

/**
 * https://reactnavigation.org/docs/hello-react-navigation
 */
const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PageA"
          screenOptions={{
            cardStyle: {elevation: 1 /**提高页面层级 */},
          }}>
          <Stack.Screen
            name="PageA"
            component={Page1}
            options={{
              headerShown: false, // 是否隐藏路由标题
            }}
          />
          <Stack.Screen
            name="PageB"
            component={Page2}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS, // 跳转动画风格
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({});

export default App;

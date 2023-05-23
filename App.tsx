import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from './src/modules/login/Login';
import Welcome from './src/modules/welcome/Welcome';

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
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false, // 是否隐藏路由标题
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false, // 是否隐藏路由标题
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({});

export default App;

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Logout from './components/Logout';
import FindCafe from './components/FindCafe';

const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="FindCafe" component={FindCafe} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

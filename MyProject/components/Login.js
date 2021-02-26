import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  Login = async () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Invalid Email or Password';
        } else {
          throw 'Something Has Gone Wrong, Please Try Again';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <ScrollView>
          <Text style={styles.Title}>Coffida</Text>
          <View style={styles.Item}>
          </View>
          <View style={styles.Item}>
            <Text style={styles.Label}>Email:</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.Input}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          <View style={styles.Item}>
            <Text style={styles.Label}>Password:</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.Input}
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </View>
          <View style={styles.Item}>
            <TouchableOpacity
              style={styles.TouchOp}
              onPress={() => this.Login()}
            >
              <Text style={styles.TouchText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Item}>
            <TouchableOpacity
              style={styles.TouchOp2}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.TouchText2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Title: {
    backgroundColor: 'crimson',
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    fontSize: 40,
  },
  Item: {
    padding: 22,
  },
  Label: {
    fontSize: 20,
    color: 'crimson',
    alignItems: 'center',
  },
  Input: {
    borderWidth: 2,
    borderColor: 'crimson',
    borderRadius: 5,
  },
  TouchOp: {
    backgroundColor: 'crimson',
    alignItems: 'center',
    padding: 7,
  },
  TouchOp2: {
    borderColor: 'crimson',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 7,
  },
  TouchText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  TouchText2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'crimson',
  }
})

export default Login;
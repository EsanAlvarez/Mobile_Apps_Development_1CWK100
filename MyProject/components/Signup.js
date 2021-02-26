import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  AddUser = () => {
    let to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Failed validation';
        } else {
          throw 'Something Has Gone Wrong, Please Try Again';
        }
      })
      .then(async (responseJson) => {
        console.log("User Account Has Been Createed With an ID:", responseJson);
        ToastAndroid.show("Account Has Been Created", ToastAndroid.SHORT);
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View>
        <ScrollView>
          <Text style={styles.Title}>Create an Account</Text>
          <View style={styles.Item}>
            <Text style={styles.Label}>First Name:</Text>
            <TextInput
              placeholder="Enter Firstname"
              style={styles.Input}
              onChangeText={(first_name) => this.setState({ first_name })}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.Item}>
            <Text style={styles.Label}>Last Name:</Text>
            <TextInput
              placeholder="Enter Lastname"
              style={styles.Input}
              onChangeText={(last_name) => this.setState({ last_name })}
              value={this.state.lastName}
            />
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
            <Text style={styles.Label}>Confirm Password:</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.Input}
              secureTextEntry
              onChangeText={(confirm_pass) => this.setState({ confirm_pass })}
              value={this.state.confirmPass}
            />
          </View>
          <View style={styles.Item}>
            <TouchableOpacity
              style={styles.TouchOp}
              onPress={() => this.AddUser()}
            >
              <Text style={styles.TouchText}>Sign Up</Text>
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
    padding: 12,
    fontSize: 26,
  },
  Item: {
    padding: 15,
  },
  Label: {
    fontSize: 17,
    color: 'crimson',
  },
  Input: {
    borderWidth: 2,
    borderColor: 'crimson',
    borderRadius: 5,
  },
  TouchOp: {
    backgroundColor: 'crimson',
    padding: 11,
    alignItems: 'center',
  },
  TouchText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  }
})

export default Signup;

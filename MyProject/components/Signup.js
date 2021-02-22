import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, Text, TouchableOpacity, StyleSheet, Button, ToastAndroid } from 'react-native';
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
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log("User created with ID:", responseJson);
        ToastAndroid.show("Account has been Created", ToastAndroid.SHORT);
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
          <Text style={styles.title}>Create an Account</Text>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>First Name:</Text>
            <TextInput
              placeholder="Enter Firstname"
              style={styles.formInput}
              onChangeText={(first_name) => this.setState({ first_name })}
              value={this.state.firstName}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Last Name:</Text>
            <TextInput
              placeholder="Enter Lastname"
              style={styles.formInput}
              onChangeText={(last_name) => this.setState({ last_name })}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Email:</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.formInput}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Password:</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.formInput}
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Confirm Password:</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.formInput}
              secureTextEntry
              onChangeText={(confirm_pass) => this.setState({ confirm_pass })}
              value={this.state.confirmPass}
            />
          </View>
          <View style={styles.formItem}>
            <TouchableOpacity
              style={styles.formTouch}
              onPress={() => this.AddUser()}
            >
              <Text style={styles.formTouchText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'crimson',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 25
  },
  formItem: {
    padding: 20
  },
  formLabel: {
    fontSize: 15,
    color: 'crimson'
  },
  formInput: {
    borderWidth: 2,
    borderColor: 'crimson',
    borderRadius: 5
  },
  formTouch: {
    backgroundColor: 'crimson',
    padding: 10,
    alignItems: 'center'
  },
  formTouchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default Signup;

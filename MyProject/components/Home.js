import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Text style={styles.title}>Welcome to Coffida</Text>
        <View style={styles.formItem}>
        </View>
        <View style={styles.formItem}>
          <TouchableOpacity
            style={styles.formTouch}
            onPress={() => navigation.navigate('FindCafe')}
          >
            <Text style={styles.formTouchText}>Find Cafe</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <TouchableOpacity
            style={styles.formTouch}
            onPress={() => this.AddUser()}
          >
            <Text style={styles.formTouchText}>Make a Review</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <TouchableOpacity
            style={styles.formTouch2}
            onPress={() => navigation.navigate('Logout')}
          >
            <Text style={styles.formTouchText2}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 30,
  },
  formItem: {
    padding: 25
  },
  formLabel: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center'
  },
  formInput: {
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 5
  },
  formTouch: {
    backgroundColor: 'crimson',
    alignItems: 'center',
    padding: 7
  },
  formTouch2: {
    borderColor: 'crimson',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 7
},
  formTouchText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  formTouchText2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'crimson'
  }
})

export default Home;
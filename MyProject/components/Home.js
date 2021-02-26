import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Home extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Text style={styles.Title}>Welcome to Coffida</Text>
        <View style={styles.Item}>
        </View>
        <View style={styles.Item}>
          <TouchableOpacity
            style={styles.TouchOp}
            onPress={() => navigation.navigate('FindCafe')}
          >
            <Text style={styles.TouchText}>Find Cafe</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Item}>
          <TouchableOpacity
            style={styles.TouchOp}
            onPress={() => this.AddUser()}
          >
            <Text style={styles.TouchText}>Make a Review</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Item}>
          <TouchableOpacity
            style={styles.TouchOp2}
            onPress={() => navigation.navigate('Logout')}
          >
            <Text style={styles.TouchText2}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    padding: 10,
    fontSize: 30,
  },
  Item: {
    padding: 25,
  },
  Label: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
  },
  Input: {
    borderWidth: 2,
    borderColor: 'lightblue',
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

export default Home;
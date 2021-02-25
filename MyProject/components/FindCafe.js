import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app requires to your location.',
        buttonNeutral: 'Ask me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

class FindCafe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationPermission: false,
      isLoading: true
    }
  }

  findCoordinates(){
    console.log("state", this.state);
    if(!this.state.locationPermission){
      console.log("asking for permission");
      this.state.locationPermission = requestLocationPermission();
    }

    this.setState({
      location: {
        longitude: -2.242631,
        latitude: 53.480759,
      },
      isLoading: false
    })

    Geolocation.getCurrentPosition((position) => {
      const location = position;
      this.setState({location: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });
    this.setState({isLoading: false});
    }, (error) => {
      Alert.alert(error.message);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    });
  }

  componentDidMount() {
    this.findCoordinates();
  }

  render() {
    if (this.state.isLoading){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      console.log("LOCATION 2: ", this.state.location);
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapsview}
            region={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002
            }}
          >
            <Marker
              coordinate={this.state.location}
              title="My location"
              description="Here I am"
            />
          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'crimson',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 14,
    fontSize: 30,
  },
  container: {
    flex: 1,
  },
  mapsview: {
    flex: 1,
  },
  formItem: {
    padding: 24
  },
  formLabel: {
    fontSize: 20,
    color: 'crimson',
    alignItems: 'center'
  },
  formInput: {
    borderWidth: 2,
    borderColor: 'crimson',
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

export default FindCafe;
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        };
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });
}

    componentWillUnmount() {
        this.unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value !== null) {
            this.setState({ token: value });
        } else {
            this.props.navigation.navigate("Login");
        }
    };

    LogoutUser = async () => {
        let token = await AsyncStorage.getItem('@session_token');
        await AsyncStorage.removeItem('@session_token');
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: {
                "X-Authorization": token
            }
        })
            .then(async (response) => {
                if (response.status === 200) {
                    ToastAndroid.show("Sucessfully Logged Out", ToastAndroid.SHORT);
                    await AsyncStorage.removeItem('@session_token');
                    this.props.navigation.navigate("Login");
                } else {
                    throw 'Something Went Wrong';
                }
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show(error, ToastAndroid.SHORT);
            });
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Text style={styles.title}>Do you want to Logout?</Text>
                <View style={styles.formItem}>
                </View>
                <View style={styles.formItem}>
                    <TouchableOpacity
                        style={styles.formTouch}
                        onPress={() => this.LogoutUser()}
                    >
                        <Text style={styles.formTouchText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formItem}>
                    <TouchableOpacity
                        style={styles.formTouch}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.formTouchText}>Go Back</Text>
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
});

export default Logout;

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
                    throw 'Something Went Wrong, Please Try Again';
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
                <Text style={styles.Title}>Do you want to Logout?</Text>
                <View style={styles.Item}>
                </View>
                <View style={styles.Item}>
                    <TouchableOpacity
                        style={styles.TouchOp}
                        onPress={() => this.LogoutUser()}
                    >
                        <Text style={styles.TouchText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Item}>
                    <TouchableOpacity
                        style={styles.TouchOp2}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.TouchText2}>Go Back</Text>
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
});

export default Logout;

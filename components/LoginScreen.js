import { StyleSheet, TextInput, View, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './config'
import { log } from 'react-native-reanimated';
import { set } from 'firebase/database';

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [flag, setFlag] = useState(false)
    const [cpassword, setCpassword] = useState()
    const [reg, setReg] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    useEffect(() => {
        setSignedIn(false);
        setReg(false);
    }, [])


    const handleRegister = async () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("registered")
                setEmail()
                setPassword()
                setCpassword()
            })
            .catch((error) => console.log(error.message))
    }

    const handleLogin = async () => {

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Logged in')
                setSignedIn(true)
                navigation.replace('AdminScreen')
            })
            .catch((error) => {
                console.log(error.message);
                setSignedIn(false)
            })

    }

    const clear = async () => {
        setPassword()
        setEmail()
        setCpassword()
    }


    const handleAll = async (val) => {
        if (val == 0) {
            setReg(true);
            await login();

        } else {
            setReg(false);

            const result = await register();

        }


    }

    const login = async () => {
        await handleLogin();
    }

    const register = async () => {

        if (password !== cpassword || password.length < 6 || cpassword.length < 6) {
            alert("Password not equal or length less than 6")

        } else {
            await handleRegister()
        }

    }

    return (

        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    autoCorrect={false}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                {!reg ? <TextInput
                    placeholder='confirm password'
                    value={cpassword}
                    onChangeText={text => setCpassword(text)}
                    style={styles.input}
                    secureTextEntry />
                    : <></>}

            </View>
            <View>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => { handleAll(0) }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonOutLine]}
                    onPress={() => { handleAll(1) }}
                >
                    <Text style={[styles.buttonText, styles.buttonOutLineText]}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        fontSize: 18,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5
    },
    inputContainer: {
        width: '80%'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#0782F9',
        borderRadius: 10,
        padding: 15

    },
    buttonContainer: {

        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },
    buttonOutLine: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
        fontSize: 16
    },
    buttonOutLineText: {
        fontWeight: '700',
        color: '#0782F9',
        fontSize: 16
    }

})
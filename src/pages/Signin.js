import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import md5 from "react-native-md5";

export default function Login( {navigation, route} ) {
    
    const [emailAddress, setEmailAddress] = useState(route.params.emailAddress);
    const [password, setPassword] = useState('');
    const [incorrectCredentials, setIncorrectCredentials] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const Authenticate = () => {
        setButtonDisabled(true);
        errors = 0;
        const requestOptions = {
            method: 'POST',
            headers: {
                "api-key": route.params.apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "dataSource": "App",
                "database": route.params.apiDB,
                "collection": "users",
                "filter": {
                    "emailAddress": emailAddress,
                    "password": md5.hex_md5(password)
                }
            }),
            redirect: 'follow'
        };
        fetch(route.params.apiAddress + '/findOne', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.document !== null) {
                    setIncorrectCredentials(false);
                    setButtonDisabled(false);
                    navigation.navigate('Authenticated',{ emailAddress: emailAddress })
                } else {
                    errors++;
                    setIncorrectCredentials(true);
                    setButtonDisabled(false);

                }
            })
            .catch(error => console.log('error', error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>Welcome back</Text>
            </View>
            <View style={styles.formBox}>
                <TextInput style={[styles.formField,incorrectCredentials ? styles.formFieldInvalid : styles.formFieldNormal]} placeholder="E-mail address" onChangeText={(thisValue) => { setEmailAddress(thisValue); setIncorrectCredentials(false) } } value={emailAddress}></TextInput>
                <TextInput style={[styles.formField,incorrectCredentials ? styles.formFieldInvalid : styles.formFieldNormal]} placeholder="Password" secureTextEntry={true} onChangeText={(thisValue) => { setPassword(thisValue); setIncorrectCredentials(false) } } value={password}></TextInput>
                <TouchableOpacity style={[styles.formButtonPrimary, buttonDisabled ? styles.formButtonPrimaryDisabled : styles.formButtonPrimaryNormal]}>
                    <Text style={styles.formButtonPrimaryText} onPress={() => buttonDisabled ? '' : Authenticate()}>{buttonDisabled ? <ActivityIndicator color="#7e1ab0" /> : 'Sign in'}</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity style={styles.formButtonSecondary} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.formButtonSecondaryText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    titleBox: {
        height: '40%',
        justifyContent: 'flex-end',
        backgroundColor: '#7e1ab0',
        paddingBottom: 29
    },
    titleText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 700,
        marginLeft: 20
    },
    formBox: {
        height: '60%',
        padding: 15,
        paddingTop: 30
    },

    orText: {
        textAlign: 'center',
        color: '#9e9e9e',
        fontSize: 17,
        fontWeight: 700,
        marginBottom: 20
    },
    formField: {
        borderWidth: 1,
        fontSize: 20,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginBottom: 20
    },
    formFieldNormal: {
        backgroundColor: '#e8e8e8',
        borderColor: '#d9d9d9'
    },

    formFieldInvalid: {
        backgroundColor: '#f0d5d5',
        borderColor: '#d49d9d',
        color: '#cc3d3d',
    },
    formButtonPrimary: {
        borderWidth: 1,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginBottom: 20
    },
    formButtonPrimaryNormal: {
        backgroundColor: '#7e1ab0',
        borderColor: '#57117a'
    },
    formButtonPrimaryDisabled: {
        padding: 23,
        backgroundColor: '#ecd2f9',
        borderColor: '#e2bcf5',
    },
    formButtonPrimaryText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
    },
    formButtonSecondary: {
        borderWidth: 1,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginBottom: 20
    },
    formButtonSecondaryNormal: {
        backgroundColor: '#fff',
        borderColor: '#57117a',
    },
    formButtonSecondaryText: {
        color: '#7e1ab0',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
    },
})
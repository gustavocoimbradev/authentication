import React, { useState, createContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import md5 from "react-native-md5";

export const AuthContext = createContext()

export default function AuthProvider({children}){

    const [user, setUser] = useState()
    const [status, setStatus] = useState(0) // Idle

    const navigation = useNavigation()

    const apiAddress = 'https://data.mongodb-api.com/app/data-svcet/endpoint/data/v1/action';
    const apiKey = 'DJsCU6o6u6cpc7HWBTewt3QNjZTUEUuTXMkRZBFaLQIP0NjkMNJtjptFrmsxxqBp';
    const apiDB = 'signupsignin';

    function signIn(emailAddress, password) {

        setStatus(1) // Authenticating

        const requestOptions = {
            method: 'POST',
            headers: {
                "api-key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "dataSource": "App",
                "database": apiDB,
                "collection": "users",
                "filter": {
                    "emailAddress": emailAddress,
                    "password": md5.hex_md5(password)
                }
            }),
            redirect: 'follow'
        };
        fetch(apiAddress + '/findOne', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.document !== null) {

                    setStatus(2) // Authenticated
                    setUser(response.document)
                    navigation.navigate('Authenticated')

                } else {

                    setStatus(3) // Incorrect credentials

                }
            })
            .catch(error => console.log('error', error))

    }

    function signOut() {

        setStatus(0) // Unauthenticated
        navigation.navigate('Signin')

    }

    values = {
        apiAddress: apiAddress,
        signIn,
        signOut,
        user,
        status
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

}

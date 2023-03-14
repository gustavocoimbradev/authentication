import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default function Authenticated({ navigation, route }) {

    const [emailAddress, setEmailAddress] = useState('');
    const [welcome, setWelcome] = useState('Hi, ...');

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
                "emailAddress": route.params.emailAddress
            }
        }),
        redirect: 'follow'
    };
    fetch(route.params.apiAddress + '/findOne', requestOptions)
        .then(response => response.json())
        .then(response => {
            if (response.document !== null) {

                setFirstName(response.document.firstName);
                setLastName(response.document.lastName);
                setEmailAddress(response.document.emailAddress);

                setWelcome('Hi, ' + response.document.firstName + ' ' + response.document.lastName)

            } else {
                navigation.navigate('Signin', { emailAddress: emailAddress });
            }
        })
        .catch(error => console.log('error', error));

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>{welcome}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>This is a simple exemple of a <Text style={styles.contentTextSpecial}>signup and signin</Text> code made using <Text style={styles.contentTextSpecial}>React Native</Text> and <Text style={styles.contentTextSpecial}>MongoDB</Text>.</Text>   
                <TouchableOpacity style={styles.contentButtonLogout} onPress={() => navigation.navigate('Signin', { authenticated: false} )}>
                    <Text style={styles.contentButtonLogoutText}>Click here to log out</Text>
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
        height: '20%',
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
    content: {
        height: '80%',
        padding: 15,
        paddingTop: 30
    },
    contentText: {
        fontSize: 20,
        lineHeight: 30
    },
    contentTextSpecial: {
        color: '#7e1ab0',
        fontWeight: 600
    },
    contentButtonLogout: {
        borderWidth: 1,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginTop: 40,
        backgroundColor: '#fff',
        borderColor: '#57117a',
    },
    contentButtonLogoutText: {
        color: '#7e1ab0',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
    },
})
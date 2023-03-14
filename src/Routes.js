import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Authenticated from './pages/Authenticated';

const Stack = createNativeStackNavigator();

export default function Routes() {

    const apiAddress = 'https://data.mongodb-api.com/app/data-svcet/endpoint/data/v1/action';
    const apiKey = '{PUT YOUR MONGODB API KEY HERE}';
    const apiDB = 'signupsignin';

    return (
        <Stack.Navigator>

            <Stack.Screen

                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
                initialParams={{ apiAddress: apiAddress, apiKey: apiKey, apiDB: apiDB }}

            />

            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
                initialParams={{ apiAddress: apiAddress, apiKey: apiKey, apiDB: apiDB }}

            />

            <Stack.Screen
                name="Authenticated"
                component={Authenticated}
                options={{ headerShown: false }}
                initialParams={{ apiAddress: apiAddress, apiKey: apiKey, apiDB: apiDB }}

            />

        </Stack.Navigator>
    )

}
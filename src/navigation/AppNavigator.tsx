import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GreqiScreen from '../views/GreqiScreen';
import HomeScreen from '../views/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Greqi" component={GreqiScreen} />
        </Stack.Navigator>
    );
}

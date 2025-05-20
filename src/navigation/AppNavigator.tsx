// src/navigation/AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AddShtetiScreen from '../views/dashboard/AddShtetiScreen';
import DashboardScreen from '../views/dashboard/DashboardScreen';
import GreqiSlider from '../views/dashboard/GreqiSlider';

import ManageShtetiScreen from '../views/dashboard/ManageShtetiScreen';
import GreqiScreen from '../views/GreqiScreen';
import HomeScreen from '../views/HomeScreen';
import LoginScreen from '../views/LoginScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Greqi" component={GreqiScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="GreqiSlider" component={GreqiSlider} />

            <Stack.Screen name="AddShteti" component={AddShtetiScreen} />
            <Stack.Screen name="ManageShteti" component={ManageShtetiScreen} />
        </Stack.Navigator>
    );
}

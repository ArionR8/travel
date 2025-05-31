// src/navigation/AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BulgariScreen from '../views/BulgariScreen';
import AddShtetiScreen from '../views/dashboard/AddShtetiScreen';
// import BullgariSlider from '../views/dashboard/BulgariImage';
import AddAirportScreen from '../views/dashboard/AddAeroportScreen';
import AddAranzhmaniScreen from '../views/dashboard/AddArazhmaniScreen';
import BulgariSliderForm from '../views/dashboard/BulgariImage';
import DashboardScreen from '../views/dashboard/DashboardScreen';
import GreqiHotels from '../views/dashboard/GreqiHotel';
import GreqiSlider from '../views/dashboard/GreqiSlider';
import ManageAeoroportScreen from '../views/dashboard/ManageAeroportScreen';
import ManageArazhmaniScreen from '../views/dashboard/ManageArazhmaniScreen';
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
            <Stack.Screen name="Bulgari" component={BulgariScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="GreqiSlider" component={GreqiSlider} />
            <Stack.Screen name="GreqiHotels" component={GreqiHotels} />
            {/*<Stack.Screen name="BullgariSlider" component={BullgariSlider} />*/}
            <Stack.Screen name="AddShteti" component={AddShtetiScreen} />
            <Stack.Screen name="ManageShteti" component={ManageShtetiScreen} />
            {/* Add other screens here as needed */}
            <Stack.Screen name="AddAranzhmani" component={AddAranzhmaniScreen} />
            <Stack.Screen name="ManageAranzhmani" component={ManageArazhmaniScreen} />
            <Stack.Screen name="AddAirport" component={AddAirportScreen} />
            <Stack.Screen name="ManageAirport" component={ManageAeoroportScreen} />
            <Stack.Screen name="BulgariSliderForm" component={BulgariSliderForm} />


            {/* Add more screens as needed */}


        </Stack.Navigator>
    );
}

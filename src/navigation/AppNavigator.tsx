// src/navigation/AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BulgariScreen from '../views/BulgariScreen';
import ContactUsScreen from '../views/ContactUsScreen';
import AddAirportScreen from '../views/dashboard/AddAeroportScreen';
import AddAranzhmaniScreen from '../views/dashboard/AddArazhmaniScreen';
import AddShtetiScreen from '../views/dashboard/AddShtetiScreen';
import { default as BulgariSliderForm, default as BullgariSlider } from '../views/dashboard/BulgariImage';
import DashboardScreen from '../views/dashboard/DashboardScreen';
import DubaiPrice from '../views/dashboard/DubaiPrice';
import GreqiHotels from '../views/dashboard/GreqiHotel';
import GreqiSlider from '../views/dashboard/GreqiSlider';
import ManageAeoroportScreen from '../views/dashboard/ManageAeroportScreen';
import ManageArazhmaniScreen from '../views/dashboard/ManageArazhmaniScreen';
import ManageShtetiScreen from '../views/dashboard/ManageShtetiScreen';
import DubaiScreen from '../views/DubaiScreen';
import GreqiScreen from '../views/GreqiScreen';
import HomeScreen from '../views/HomeScreen';
import RegisterScreen from '../views/RegisterScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Greqi" component={GreqiScreen} />
            <Stack.Screen name="Bulgari" component={BulgariScreen} />
            <Stack.Screen name="Dubai" component={DubaiScreen} />
            <Stack.Screen name="DubaiPrice" component={DubaiPrice} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="GreqiSlider" component={GreqiSlider} />
            <Stack.Screen name="GreqiHotels" component={GreqiHotels} />
            <Stack.Screen name="BullgariSlider" component={BullgariSlider} />
            <Stack.Screen name="AddShteti" component={AddShtetiScreen} />
            <Stack.Screen name="ManageShteti" component={ManageShtetiScreen} />
            <Stack.Screen name="AddAranzhmani" component={AddAranzhmaniScreen} />
            <Stack.Screen name="ManageAranzhmani" component={ManageArazhmaniScreen} />
            <Stack.Screen name="AddAirport" component={AddAirportScreen} />
            <Stack.Screen name="ManageAirport" component={ManageAeoroportScreen} />
            <Stack.Screen name="BulgariSliderForm" component={BulgariSliderForm} />


        </Stack.Navigator>
    );
}

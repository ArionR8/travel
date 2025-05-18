// src/views/HomeScreen.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import NavBoard from '../components/NavBoard';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View>
            <NavBoard navigation={navigation} />
            <Text>Welcome to the Home Page!</Text>
        </View>
    );
}
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DashboardNavBoard from '../../components/dashboard/NavBoard';
import { RootStackParamList } from '../../navigation/types'; // adjust path as needed

type DashboardScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
    return (
        <View style={{ flex: 1 }}>
            <DashboardNavBoard navigation={navigation} />
            <View style={styles.center}>
                <Text style={styles.text}>Welcome to Dashboard</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

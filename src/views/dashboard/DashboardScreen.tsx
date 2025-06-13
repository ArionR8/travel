import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DashboardNavBoard from '../../components/dashboard/NavBoard';
import { RootStackParamList } from '../../navigation/types';
import { useAranzhmani } from '../../viewmodels/useArazhmani';
import { useLogs } from '../../viewmodels/useLog';
import { useUser } from '../../viewmodels/useUser';

import CountBoxes from '../../components/dashboard/CountBox';
import LogsList from '../../components/dashboard/LogsList';

type DashboardScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Dashboard'>;
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
    const { logs, loading, error } = useLogs();
    const { userCount, loadingCount, errorCount } = useUser();
    const { count: aranzhmaniCount, loading: loadingAranzhmani, error: errorAranzhmani } = useAranzhmani();

    return (
        <View style={{ flex: 1 }}>
            <DashboardNavBoard navigation={navigation} />

            <View style={styles.center}>
                <Text style={styles.text}>Welcome to Dashboard</Text>
            </View>

            <CountBoxes
                userCount={userCount}
                loadingUser={loadingCount}
                errorUser={errorCount}
                aranzhmaniCount={aranzhmaniCount}
                loadingAranzhmani={loadingAranzhmani}
                errorAranzhmani={errorAranzhmani}
            />

            <LogsList logs={logs} loading={loading} error={error} />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

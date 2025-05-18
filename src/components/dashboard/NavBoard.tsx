import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigation/types';

type DashboardNavBoardProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

export default function DashboardNavBoard({ navigation }: DashboardNavBoardProps) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <View style={styles.container}>
            {/* Dashboard Title on the LEFT */}
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.title}>Dashboard</Text>
            </TouchableOpacity>

            {/* Menu button on the RIGHT */}
            <TouchableOpacity
                onPress={() => setShowMenu((v) => !v)}
                style={styles.menuButton}
                activeOpacity={0.7}
            >
                <Text style={styles.menuText}>☰ Menu</Text>
            </TouchableOpacity>

            {/* Dropdown menu */}
            {showMenu && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        style={styles.itemWrapper}
                        onPress={() => {
                            setShowMenu(false);
                            navigation.navigate('GreqiSlider');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Manage GreqiSlider</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.itemWrapper}
                        onPress={() => {
                            setShowMenu(false);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2980b9',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        // No flex here, so title stays left-aligned
    },
    menuButton: {
        padding: 10,
        marginLeft: 'auto', // Push menu button to the right side
    },
    menuText: {
        fontSize: 18,
        color: '#fff',
    },

    dropdown: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderRadius: 6,
        elevation: 4, // shadow for Android
        shadowColor: '#000', // shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1000,
    },
    itemWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    dropdownItem: {
        fontSize: 16,
        color: '#333',
    },
});

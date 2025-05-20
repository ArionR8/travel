import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigation/types';

type DashboardNavBoardProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

export default function DashboardNavBoard({ navigation }: DashboardNavBoardProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [showAranzhmani, setShowAranzhmani] = useState(false);
    const [showAeroport, setShowAeroport] = useState(false);
    const [showShtete, setShowShtete] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.title}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setShowMenu(v => !v)}
                style={styles.menuButton}
                activeOpacity={0.7}
            >
                <Text style={styles.menuText}>☰ Menu</Text>
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.dropdown}>
                    {/* Aranzhmani */}
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => setShowAranzhmani(v => !v)}
                    >
                        <Text style={styles.itemText}>
                            Aranzhmani {showAranzhmani ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>
                    {showAranzhmani && (
                        <View style={styles.submenu}>
                            <TouchableOpacity
                                style={styles.subItem}
                                onPress={() => {
                                    setShowMenu(false);
                                    setShowAranzhmani(false);
                                    navigation.navigate('AddAranzhmani');
                                }}
                            >
                                <Text style={styles.itemText}>Add Aranzhmani</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.subItem}
                                onPress={() => {
                                    setShowMenu(false);
                                    setShowAranzhmani(false);
                                    navigation.navigate('ManageAranzhmani');
                                }}
                            >
                                <Text style={styles.itemText}>Manage Aranzhmanet</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Aeroports */}
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => setShowAeroport(v => !v)}
                    >
                        <Text style={styles.itemText}>
                            Aeroports {showAeroport ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>
                    {showAeroport && (
                        <View style={styles.submenu}>
                            <TouchableOpacity
                                style={styles.subItem}
                                onPress={() => {
                                    setShowMenu(false);
                                    setShowAeroport(false);
                                    navigation.navigate('AddAirport');
                                }}
                            >
                                <Text style={styles.itemText}>Add Aeroport</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.subItem}
                                onPress={() => {
                                    setShowMenu(false);
                                    setShowAeroport(false);
                                    navigation.navigate('ManageAirport');
                                }}
                            >
                                <Text style={styles.itemText}>Manage Aeroports</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Shtete */}
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => setShowShtete(v => !v)}
                    >
                        <Text style={styles.itemText}>
                            Shtete {showShtete ? '▲' : '▼'}
                        </Text>
                    </TouchableOpacity>
                    {showShtete && (
                        <View style={styles.submenu}>
                            <TouchableOpacity
                                style={styles.subItem}
                                onPress={() => {
                                    setShowMenu(false);
                                    setShowShtete(false);
                                    navigation.navigate('AddShteti');
                                }}
                            >
                                <Text style={styles.itemText}>Add Shtet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.subItem}
                                onPress={() => {
                                    setShowMenu(false);
                                    setShowShtete(false);
                                    navigation.navigate('ManageShteti');
                                }}
                            >
                                <Text style={styles.itemText}>Manage Shtete</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Other links */}
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            setShowMenu(false);
                            navigation.navigate('GreqiSlider');
                        }}
                    >
                        <Text style={styles.itemText}>Manage GreqiSlider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            setShowMenu(false);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.itemText}>Back to Home</Text>
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
    },
    menuButton: {
        marginLeft: 'auto',
        padding: 10,
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
        borderRadius: 6,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1000,
        minWidth: 180,
        paddingVertical: 4,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    submenu: {
        backgroundColor: '#f9f9f9',
        borderLeftWidth: 2,
        borderLeftColor: '#2980b9',
        paddingLeft: 16,
        marginBottom: 4,
    },
    subItem: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
});

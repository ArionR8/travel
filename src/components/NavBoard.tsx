import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../viewmodels/useAuth';
import { useUser } from '../viewmodels/useUser';

type NavBoardProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

export default function NavBoard({ navigation }: NavBoardProps) {
    const { user, logout, refresh } = useUser();
    const { login, loading: authLoading, error: authError } = useAuth();

    const [showMenu, setShowMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [creds, setCreds] = useState({ username: '', password: '' });

    const handleLogin = async () => {
        try {
            const loggedUser = await login(creds.username, creds.password);
            await refresh();
            setShowLogin(false);
            Alert.alert('✅ Logged in!');
        } catch {
            Alert.alert('Login failed', authError || 'Unknown error');
        }
    };

    const handleLogout = () => {
        logout();
        Alert.alert('👋 Logged out');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bani Travell</Text>
            <TouchableOpacity onPress={() => setShowMenu(v => !v)} style={styles.menuButton}>
                <Text style={styles.menuText}>☰ Menu</Text>
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        style={styles.itemWrapper}
                        onPress={() => {
                            setShowMenu(false);
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Home</Text>
                    </TouchableOpacity>

                    {/* Only show Dashboard if user role is 'admin' */}
                    {user?.role === 'admin' && (
                        <TouchableOpacity
                            style={styles.itemWrapper}
                            onPress={() => {
                                setShowMenu(false);
                                navigation.navigate('Dashboard');
                            }}
                        >
                            <Text style={styles.dropdownItem}>Dashboard</Text>
                        </TouchableOpacity>
                    )}

                    {/* Greqi page link */}
                    <TouchableOpacity
                        style={styles.itemWrapper}
                        onPress={() => {
                            setShowMenu(false);
                            navigation.navigate('Greqi');
                        }}
                    >
                        <Text style={styles.dropdownItem}>Greqi</Text>
                    </TouchableOpacity>

                    {user ? (
                        <TouchableOpacity style={styles.itemWrapper} onPress={handleLogout}>
                            <Text style={styles.dropdownItem}>Logout</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.itemWrapper}
                            onPress={() => {
                                setShowMenu(false);
                                setShowLogin(true);
                            }}
                        >
                            <Text style={styles.dropdownItem}>Login</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Login Modal */}
            <Modal visible={showLogin} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Log in</Text>
                        <TextInput
                            placeholder="Username"
                            value={creds.username}
                            onChangeText={v => setCreds(c => ({ ...c, username: v }))}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Password"
                            value={creds.password}
                            onChangeText={v => setCreds(c => ({ ...c, password: v }))}
                            style={styles.input}
                            secureTextEntry
                        />

                        {authLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginText}>Submit</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => setShowLogin(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#3498db',
    },
    title: { flex: 1, fontSize: 20, color: '#fff', fontWeight: 'bold' },
    menuButton: { padding: 10 },
    menuText: { fontSize: 18, color: '#fff' },

    dropdown: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderRadius: 6,
        elevation: 4,
    },
    itemWrapper: { paddingHorizontal: 12, paddingVertical: 6 },
    dropdownItem: { fontSize: 16, color: '#333' },

    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
    },
    modalTitle: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
        borderRadius: 4,
    },
    loginButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    loginText: { color: '#fff', fontWeight: 'bold' },
    cancelText: { color: '#3498db', textAlign: 'center', marginTop: 10 },
});

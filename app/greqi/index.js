import { StyleSheet, Text, View } from 'react-native';

export default function GreqiScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Greece!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    welcomeText: { fontSize: 28, fontWeight: 'bold', color: '#333' },
});

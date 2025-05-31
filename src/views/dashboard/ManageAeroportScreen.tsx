import React from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAirport } from '../../viewmodels/useAeroport';

export default function ManageAeroportsScreen() {
    const { items, loading, error, remove, refresh } = useAirport();

    const confirmDelete = (id: string, name: string) =>
        Alert.alert(
            'Konfirmo Fshirjen', 
            `A jeni të sigurt që doni të fshini aeroportin "${name}"?`, 
            [
                { text: 'Anulo', style: 'cancel' },
                { 
                    text: 'Fshi', 
                    style: 'destructive', 
                    onPress: () => remove(id) 
                },
            ]
        );

    // Loading State
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={styles.loadingText}>Duke ngarkuar aeroportet...</Text>
            </View>
        );
    }

    // Error State
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorTitle}>Gabim në Ngarkim</Text>
                <Text style={styles.errorMessage}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refresh}>
                    <Text style={styles.retryButtonText}>🔄 Provo Përsëri</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Empty State
    if (!items || items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>✈️</Text>
                <Text style={styles.emptyTitle}>Asnjë Aeroport</Text>
                <Text style={styles.emptyMessage}>
                    Nuk ka aeroporte të regjistruar aktualisht.
                </Text>
            </View>
        );
    }

    const renderAirportItem = ({ item, index }) => (
        <View style={[styles.airportCard, { opacity: loading ? 0.6 : 1 }]}>
            <View style={styles.airportInfo}>
                <View style={styles.airportHeader}>
                    <Text style={styles.airportName}>{item.emri}</Text>
                    <View style={styles.acronymBadge}>
                        <Text style={styles.acronymText}>{item.akronimi}</Text>
                    </View>
                </View>
                {item.shteti && (
                    <Text style={styles.countryText}>📍 {item.shteti}</Text>
                )}
            </View>
            
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(item.id, item.emri)}
                activeOpacity={0.7}
            >
                <Text style={styles.deleteIcon}>🗑️</Text>
                <Text style={styles.deleteText}>Fshi</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Menaxho Aeroportet</Text>
                <Text style={styles.subtitle}>
                    {items.length} aeroport{items.length !== 1 ? 'e' : ''} të regjistruar
                </Text>
            </View>

            {/* Airport List */}
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderAirportItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refresh}
                        colors={['#3B82F6']}
                        tintColor="#3B82F6"
                    />
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    airportCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    airportInfo: {
        flex: 1,
        marginRight: 16,
    },
    airportHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    airportName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
        marginRight: 12,
    },
    acronymBadge: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    acronymText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    countryText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    deleteButton: {
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70,
    },
    deleteIcon: {
        fontSize: 16,
        marginBottom: 2,
    },
    deleteText: {
        color: '#DC2626',
        fontSize: 12,
        fontWeight: '600',
    },
    separator: {
        height: 12,
    },
    // Loading State
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
    },
    // Error State
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
    },
    errorIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    retryButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    // Empty State
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
});
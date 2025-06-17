// views/dashboard/ManageAranzhmaniScreen.tsx
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Modal,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Aranzhmani } from '../../models/Aranzhmani';
import { useAranzhmani } from '../../viewmodels/useArazhmani';

// Add navigation imports
import { StackNavigationProp } from '@react-navigation/stack';
import DashboardNavBoard from '../../components/dashboard/NavBoard';
import { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

interface EditModalProps {
    visible: boolean;
    item: Aranzhmani | null;
    onClose: () => void;
    onSave: (id: string, data: Partial<Aranzhmani>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, item, onClose, onSave }) => {
    const [editForm, setEditForm] = useState<Partial<Aranzhmani>>({});

    React.useEffect(() => {
        if (item) {
            setEditForm({
                titulli: item.titulli || '',
                cmimi: item.cmimi || '',
                nrPersonave: item.nrPersonave || '',
                nrNeteve: item.nrNeteve || '',
                llojiDhomes: item.llojiDhomes || '',
                sherbimi: item.sherbimi || '',
                dataNisjes: item.dataNisjes || '',
                dataKthimit: item.dataKthimit || '',
                rating: item.rating || ''
            });
        }
    }, [item]);

    const handleSave = () => {
        if (!item?.id) return;

        if (!editForm.titulli?.trim()) {
            Alert.alert('Gabim', 'Titulli është i detyrueshëm');
            return;
        }

        onSave(item.id, editForm);
        onClose();
    };

    if (!visible || !item) return null;

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>✏️ Modifiko Aranzhmani</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Titulli *</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={editForm.titulli?.toString() || ''}
                                onChangeText={text => setEditForm(f => ({ ...f, titulli: text }))}
                                placeholder="Shkruani titullin"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.inputLabel}>Cmimi (EUR)</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editForm.cmimi?.toString() || ''}
                                    onChangeText={text => {
                                        const num = Number(text);
                                        setEditForm(f => ({ ...f, cmimi: isNaN(num) ? '' : text }));
                                    }}
                                    placeholder="0.00"
                                    keyboardType="numeric"
                                    placeholderTextColor="#999"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.inputLabel}>Rating ⭐</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editForm.rating?.toString() || ''}
                                    onChangeText={text => {
                                        const num = Number(text);
                                        setEditForm(f => ({ ...f, rating: isNaN(num) ? '' : text }));
                                    }}
                                    placeholder="1-5"
                                    keyboardType="numeric"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        <View style={styles.inputRow}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.inputLabel}>Nr. Personave</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editForm.nrPersonave?.toString() || ''}
                                    onChangeText={text => {
                                        const num = Number(text);
                                        setEditForm(f => ({ ...f, nrPersonave: isNaN(num) ? '' : text }));
                                    }}
                                    placeholder="1"
                                    keyboardType="numeric"
                                    placeholderTextColor="#999"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.inputLabel}>Nr. Neteve</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editForm.nrNeteve?.toString() || ''}
                                    onChangeText={text => {
                                        const num = Number(text);
                                        setEditForm(f => ({ ...f, nrNeteve: isNaN(num) ? '' : text }));
                                    }}
                                    placeholder="1"
                                    keyboardType="numeric"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Lloji i Dhomës</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={editForm.llojiDhomes?.toString() || ''}
                                onChangeText={text => setEditForm(f => ({ ...f, llojiDhomes: text }))}
                                placeholder="Dhomë dopio, Suite, Single"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shërbimi</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={editForm.sherbimi?.toString() || ''}
                                onChangeText={text => setEditForm(f => ({ ...f, sherbimi: text }))}
                                placeholder="All-Inclusive, Half Board"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.inputLabel}>Data Nisjes</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editForm.dataNisjes?.toString() || ''}
                                    onChangeText={text => setEditForm(f => ({ ...f, dataNisjes: text }))}
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor="#999"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.inputLabel}>Data Kthimit</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={editForm.dataKthimit?.toString() || ''}
                                    onChangeText={text => setEditForm(f => ({ ...f, dataKthimit: text }))}
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.modalActions}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Anulo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>💾 Ruaj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Add navigation props type
type ManageAranzhmaniScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'ManageAranzhmani'>;
};

export default function ManageAranzhmaniScreen({ navigation }: ManageAranzhmaniScreenProps) {
    const { items, loading, error, message, modify, remove } = useAranzhmani();
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Aranzhmani | null>(null);

    const filteredItems = items.filter(item =>
        item.titulli?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sherbimi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.llojiDhomes?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onRefresh = async () => {
        setRefreshing(true);
        // The useAranzhmani hook should handle refreshing
        setTimeout(() => setRefreshing(false), 1000);
    };

    const handleEdit = (item: Aranzhmani) => {
        setSelectedItem(item);
        setEditModalVisible(true);
    };

    const handleDelete = (item: Aranzhmani) => {
        Alert.alert(
            'Konfirmo Fshirjen',
            `A jeni i sigurt që dëshironi të fshini "${item.titulli}"?`,
            [
                { text: 'Anulo', style: 'cancel' },
                {
                    text: 'Fshi',
                    style: 'destructive',
                    onPress: () => remove(item.id)
                }
            ]
        );
    };

    const renderStars = (rating: number | undefined) => {
        const stars = [];
        const ratingNum = Number(rating) || 0;
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Text key={i} style={styles.star}>
                    {i <= ratingNum ? '⭐' : '☆'}
                </Text>
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    const renderAranzhmaniCard = ({ item }: { item: Aranzhmani }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{item.titulli || 'Aranzhmani'}</Text>
                    <Text style={styles.cardSubtitle}>
                        {item.dataNisjes && item.dataKthimit
                            ? `${item.dataNisjes} - ${item.dataKthimit}`
                            : 'Data jo e specifikuar'
                        }
                    </Text>
                </View>
                <View style={styles.cardActions}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEdit(item)}
                    >
                        <Text style={styles.editButtonText}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item)}
                    >
                        <Text style={styles.deleteButtonText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>💰 Cmimi</Text>
                        <Text style={styles.infoValue}>
                            {item.cmimi ? `€${item.cmimi}` : 'N/A'}
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>👥 Persona</Text>
                        <Text style={styles.infoValue}>{item.nrPersonave || 'N/A'}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>🌙 Netë</Text>
                        <Text style={styles.infoValue}>{item.nrNeteve || 'N/A'}</Text>
                    </View>
                </View>

                {(item.llojiDhomes || item.sherbimi) && (
                    <View style={styles.detailsRow}>
                        {item.llojiDhomes && (
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>🏨 {item.llojiDhomes}</Text>
                            </View>
                        )}
                        {item.sherbimi && (
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>🍽️ {item.sherbimi}</Text>
                            </View>
                        )}
                    </View>
                )}

                {item.rating && (
                    <View style={styles.ratingRow}>
                        {renderStars(item.rating ? Number(item.rating) : undefined)}
                        <Text style={styles.ratingText}>({item.rating}/5)</Text>
                    </View>
                )}
            </View>
        </View>
    );

    if (loading && items.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text style={styles.loadingText}>Duke ngarkuar aranzhmanet...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

            {/* Add Dashboard Navigation Board */}
            <DashboardNavBoard navigation={navigation} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Menaxho Aranzhmanet</Text>
                <Text style={styles.headerSubtitle}>
                    {items.length} aranzhmane gjithsej
                </Text>
            </View>

            <View style={styles.container}>
                {message && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>✅ {message}</Text>
                    </View>
                )}

                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Kërko aranzhmanet..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearchQuery('')}
                            style={styles.clearSearch}
                        >
                            <Text style={styles.clearSearchText}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {filteredItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📭</Text>
                        <Text style={styles.emptyTitle}>
                            {searchQuery ? 'Nuk u gjet asgjë' : 'Nuk ka aranzhmanet'}
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            {searchQuery
                                ? 'Provoni një kërkesë tjetër'
                                : 'Shtoni aranzhmani të reja për t\'i menaxhuar këtu'
                            }
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredItems}
                        keyExtractor={item => item.id}
                        renderItem={renderAranzhmaniCard}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#2196F3']}
                                tintColor="#2196F3"
                            />
                        }
                    />
                )}

                <EditModal
                    visible={editModalVisible}
                    item={selectedItem}
                    onClose={() => {
                        setEditModalVisible(false);
                        setSelectedItem(null);
                    }}
                    onSave={modify}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2196F3',
        paddingTop: 20, // Reduced from 60 to account for nav board
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#E3F2FD',
        textAlign: 'center',
        marginTop: 4,
        opacity: 0.9,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    errorIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 18,
        color: '#F44336',
        textAlign: 'center',
        fontWeight: '600',
    },
    messageContainer: {
        margin: 16,
        backgroundColor: '#E8F5E8',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    messageText: {
        color: '#2E7D32',
        fontSize: 16,
        fontWeight: '600',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2E3A47',
    },
    clearSearch: {
        padding: 4,
    },
    clearSearchText: {
        fontSize: 16,
        color: '#999',
    },
    listContainer: {
        padding: 16,
        paddingTop: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    cardTitleContainer: {
        flex: 1,
        marginRight: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2E3A47',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        backgroundColor: '#FFF3E0',
        borderRadius: 8,
        padding: 8,
        minWidth: 36,
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#FFEBEE',
        borderRadius: 8,
        padding: 8,
        minWidth: 36,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: 16,
    },
    cardContent: {
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    infoItem: {
        alignItems: 'center',
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2E3A47',
    },
    detailsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    tag: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    tagText: {
        fontSize: 12,
        color: '#1976D2',
        fontWeight: '600',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    star: {
        fontSize: 16,
        marginRight: 2,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2E3A47',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width - 40,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2E3A47',
    },
    closeButton: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    modalContent: {
        padding: 20,
        maxHeight: 400,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E3A47',
        marginBottom: 8,
    },
    modalInput: {
        borderWidth: 2,
        borderColor: '#E1E8ED',
        backgroundColor: '#FAFBFC',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#2E3A47',
    },
    modalActions: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
});
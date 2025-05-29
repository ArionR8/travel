// src/view/dashborad/GreqiSliderForm.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DashboardNavBoard from '../../components/dashboard/NavBoard';
import { RootStackParamList } from '../../navigation/types';
import { useGreqi } from '../../viewmodels/useGreqi';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type Props = { navigation: NavigationProp };

export default function GreqiSliderForm({ navigation }: Props) {
    const {
        images,
        imagesLoading,
        imagesError,
        imagesMessage,
        addImage,
        deleteImage,
        updateImage,
    } = useGreqi();

    const [title, setTitle] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permission required', 'Permission to access gallery is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                quality: 0.7,
            });

            if (!result.canceled && result.assets.length > 0) {
                const base64 = result.assets[0].base64;
                if (base64) setImageBase64(base64);
            }
        } catch (err: unknown) {
            Alert.alert('Image Picker Error', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const handleAddOrUpdate = async () => {
        if (!title.trim() || !imageBase64.trim()) {
            Alert.alert('Validation', 'Please enter a title and select an image');
            return;
        }

        try {
            if (editingId) {
                await updateImage(editingId, title.trim(), imageBase64.trim());
                setEditingId(null);
            } else {
                await addImage(title.trim(), imageBase64.trim());
            }
            setTitle('');
            setImageBase64('');
        } catch (err: unknown) {
            Alert.alert('Error', err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const confirmDelete = (id: string) => {
        Alert.alert('Delete Image', 'Really delete?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deleteImage(id) },
        ]);
    };

    const promptUpdate = (id: string, currentTitle: string, currentImageBase64: string) => {
        Alert.prompt(
            'Edit Title',
            'Enter new title:',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Save',
                    onPress: async (newTitle) => {
                        if (newTitle?.trim()) {
                            setTitle(newTitle.trim());
                            setImageBase64(currentImageBase64);
                            setEditingId(id);
                        }
                    },
                },
            ],
            'plain-text',
            currentTitle
        );
    };

    const renderRow = ({ item }: { item: typeof images[0] }) => (
        <View style={styles.row}>
            <Image source={{ uri: item.dataUri }} style={styles.thumb} />
            <View style={{ flex: 1, marginHorizontal: 8 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity
                onPress={() =>
                    promptUpdate(
                        item.id,
                        item.title,
                        item.dataUri.replace('data:image/jpeg;base64,', '')
                    )
                }
            >
                <Text style={styles.action}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Text style={[styles.action, { color: '#c00' }]}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <DashboardNavBoard navigation={navigation} />

            <View style={styles.form}>
                <Text style={styles.heading}>
                    {editingId ? 'Edit Slider Image' : 'Add Slider Image'}
                </Text>
                {imagesMessage ? <Text style={styles.message}>{imagesMessage}</Text> : null}
                {imagesError ? (
                    <Text style={[styles.message, { color: '#c00' }]}>{imagesError}</Text>
                ) : null}

                <TextInput
                    placeholder="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
                <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                    <Text style={styles.pickButtonText}>Choose Image from Phone</Text>
                </TouchableOpacity>
                {imageBase64 ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                        style={styles.preview}
                    />
                ) : null}

                <TouchableOpacity
                    style={[styles.button, imagesLoading && { opacity: 0.6 }]}
                    disabled={imagesLoading}
                    onPress={handleAddOrUpdate}
                >
                    <Text style={styles.buttonText}>
                        {imagesLoading ? 'Saving…' : editingId ? 'Update Image' : 'Add Image'}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={images}
                keyExtractor={(i) => i.id}
                renderItem={renderRow}
                ListEmptyComponent={() => (
                    <Text style={{ padding: 20, textAlign: 'center' }}>
                        {imagesLoading ? 'Loading…' : 'No images yet.'}
                    </Text>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    message: { marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    pickButton: {
        backgroundColor: '#27ae60',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 12,
    },
    pickButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    preview: {
        width: '100%',
        height: 150,
        borderRadius: 6,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#2980b9',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    thumb: { width: 60, height: 40, borderRadius: 4 },
    rowTitle: { fontSize: 16 },
    action: { fontSize: 20, marginHorizontal: 8 },
});

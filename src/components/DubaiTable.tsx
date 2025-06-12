import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    perfshihet: string[];
    nukPerfshihet: string[];
};

export default function ToggleTable({ perfshihet, nukPerfshihet }: Props) {
    const [activeTab, setActiveTab] = useState<'perfshihet' | 'nukPerfshihet'>('perfshihet');

    const renderList = (items: string[]) => {
        return items.map((item, index) => (
            <View key={index} style={styles.listItem}>
                <Text style={[styles.listIcon, activeTab === 'perfshihet' ? styles.iconPerfshihet : styles.iconNukPerfshihet]}>
                    {activeTab === 'perfshihet' ? '✔️' : '✘'}
                </Text>
                <Text style={styles.listText}>{item}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'perfshihet' ? styles.activeTabPerfshihet : styles.inactiveTab,
                    ]}
                    onPress={() => setActiveTab('perfshihet')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'perfshihet' ? styles.activeTabTextPerfshihet : styles.inactiveTabText,
                        ]}
                    >
                        Në çmim përfshihet
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'nukPerfshihet' ? styles.activeTabNukPerfshihet : styles.inactiveTab,
                    ]}
                    onPress={() => setActiveTab('nukPerfshihet')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeTab === 'nukPerfshihet' ? styles.activeTabTextNukPerfshihet : styles.inactiveTabText,
                        ]}
                    >
                        Në çmim nuk përfshihet
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.listWrapper}>
                {activeTab === 'perfshihet' ? renderList(perfshihet) : renderList(nukPerfshihet)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: '#f3f4f6', // Light gray background for container
        borderRadius: 12,
        paddingVertical: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeTabPerfshihet: {
        backgroundColor: '#d1fae5', // greenish bg for active perfshihet tab
        borderBottomColor: '#10b981', // emerald green bottom border
        borderTopLeftRadius: 12,
        borderTopRightRadius: 0,
    },
    activeTabNukPerfshihet: {
        backgroundColor: '#fee2e2', // reddish bg for active nuk perfshihet tab
        borderBottomColor: '#ef4444', // red bottom border
        borderTopRightRadius: 12,
        borderTopLeftRadius: 0,
    },
    inactiveTab: {
        backgroundColor: '#e5e7eb', // neutral gray bg for inactive tabs
    },
    tabText: {
        textAlign: 'center',
        fontWeight: '600',
    },
    activeTabTextPerfshihet: {
        color: '#065f46', // dark green text
    },
    activeTabTextNukPerfshihet: {
        color: '#991b1b', // dark red text
    },
    inactiveTabText: {
        color: '#6b7280', // gray text for inactive
    },
    listWrapper: {
        maxHeight: 250,
        paddingHorizontal: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db', // light gray border
    },
    listIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    iconPerfshihet: {
        color: '#10b981', // emerald green check
    },
    iconNukPerfshihet: {
        color: '#ef4444', // red cross
    },
    listText: {
        flex: 1,
        fontSize: 16,
        color: '#374151', // dark gray text
    },
});

import React, { ReactNode, useState } from 'react';
import { Modal as RNModal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    children: ReactNode;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
};

export default function Modal({ children, onConfirm, confirmText = 'Yes', cancelText = 'No' }: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)}>
                {children}
            </TouchableOpacity>

            <RNModal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.box}>
                        <Text style={styles.text}>Are you sure?</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => { setVisible(false); onConfirm(); }}
                            >
                                <Text>{confirmText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, styles.cancel]}
                                onPress={() => setVisible(false)}
                            >
                                <Text>{cancelText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 250,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    text: { marginBottom: 15, fontSize: 16, textAlign: 'center' },
    buttons: { flexDirection: 'row', justifyContent: 'space-around' },
    btn: { paddingHorizontal: 12, paddingVertical: 8 },
    cancel: { backgroundColor: '#eee' },
});

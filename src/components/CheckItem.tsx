import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type CheckItemProps = {
    label: string;
};

export default function CheckItem({ label }: CheckItemProps) {
    return (
        <View style={styles.container}>
            <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={styles.icon}
            >
                <Path d="M5 13l4 4L19 7" />
            </Svg>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: 12,
        marginHorizontal: 2,
        alignSelf: 'flex-start',
    },
    icon: {
        marginRight: 6,
    },
    text: {
        fontSize: 14,
        color: '#1f2937',
        fontWeight: '600',
        flexShrink: 1,
    },
});

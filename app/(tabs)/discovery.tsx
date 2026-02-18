import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

export default function DiscoveryScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Discovery</Text>
            <Text style={styles.subtitle}>Swipe deck coming soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100, // clear floating tab bar
    },
    title: {
        ...TYPOGRAPHY.h1,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        marginTop: 8,
        color: COLORS.text.secondary,
    },
});

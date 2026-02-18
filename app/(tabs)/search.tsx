import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search</Text>
            <Text style={styles.subtitle}>Fragrance search coming soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
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

import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: {
    route: string;
    label: string;
    icon: IoniconName;
    iconActive: IoniconName;
}[] = [
        {
            route: 'discovery',
            label: 'Discovery',
            icon: 'layers-outline',
            iconActive: 'layers',
        },
        {
            route: 'home',
            label: 'Home',
            icon: 'home-outline',
            iconActive: 'home',
        },
        {
            route: 'search',
            label: 'Search',
            icon: 'search-outline',
            iconActive: 'search',
        },
        {
            route: 'profile',
            label: 'Profile',
            icon: 'person-outline',
            iconActive: 'person',
        },
    ];

export default function GlassTabBar({
    state,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.wrapper,
                { bottom: Math.max(insets.bottom, 16) + 8 },
            ]}
            pointerEvents="box-none"
        >
            <BlurView intensity={60} tint="light" style={styles.blur}>
                <View style={styles.overlay}>
                    {state.routes.map((route, index) => {
                        const tab = TABS.find((t) => t.route === route.name);
                        if (!tab) return null;

                        const isActive = state.index === index;
                        const iconName = isActive ? tab.iconActive : tab.icon;
                        const iconColor = isActive ? COLORS.accent.gold : 'rgba(80,70,60,0.55)';

                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={() => navigation.navigate(route.name)}
                                activeOpacity={0.75}
                                style={styles.tab}
                                accessibilityLabel={tab.label}
                                accessibilityRole="button"
                                accessibilityState={{ selected: isActive }}
                            >
                                <Ionicons name={iconName} size={24} color={iconColor} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        alignSelf: 'center',
        // Keep pointer events out of transparent area
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    blur: {
        borderRadius: 9999,
        overflow: 'hidden',
        // On Android BlurView has limited support — the overlay provides the tint
        ...Platform.select({
            android: { backgroundColor: 'rgba(244, 241, 234, 0.85)' },
        }),
    },
    overlay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.30)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.50)',
        borderRadius: 9999,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 8,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
});

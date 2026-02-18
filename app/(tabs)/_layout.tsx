import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../constants/theme';
import GlassTabBar from '../../components/navigation/GlassTabBar';
import DiscoveryScreen from './discovery';
import HomeScreen from './home';
import SearchScreen from './search';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator
            tabBar={(props) => <GlassTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="discovery"
        >
            <Tab.Screen name="discovery" component={DiscoveryScreen} />
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="search" component={SearchScreen} />
            <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import HomeScreen from '../screens/main/HomeScreen';
import ScanScreen from '../screens/main/ScanScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // TODO: Add tabBarIcon
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: 'Scan',
          // TODO: Add tabBarIcon
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          // TODO: Add tabBarIcon
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          // TODO: Add tabBarIcon
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

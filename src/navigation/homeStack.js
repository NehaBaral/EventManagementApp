import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../components/home";
import { Ionicons } from '@expo/vector-icons';
import Favourite from "../components/favourite";
import { createStackNavigator } from "@react-navigation/stack";
import EventForm from "../components/eventForm";
import { Alert, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { db, auth } from '../database/config';
import { signOut } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeStack() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleSignout = async () => {
    try {
      setLoading(true)
      await signOut(auth);
    } catch (error) {
      Alert.alert("Error", "Error logging out:");
    } finally {
      setLoading(false)
    }
  }

  const HomeTab = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Events'
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity style={{
                paddingHorizontal: 10, marginRight: 10, borderRadius: 10, paddingVertical: 5
              }} onPress={() => {
                handleSignout()
              }}>
                {loading ? (
                  <ActivityIndicator size="small" color="green" />
                ) : (
                  <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign Out</Text>
                )}
              </TouchableOpacity>
            ),
            headerTitle: 'Events',
          }}>
        </Stack.Screen>

        <Stack.Screen
          name='AddEvent'
          component={EventForm}
          options={{ title: 'Add Event' }}>
        </Stack.Screen>

      </Stack.Navigator>
    )
  };

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#145a32',
      tabBarInactiveTintColor: 'gray',
      headerTitleAlign: 'center',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Favourite') {
          iconName = focused ? 'heart' : 'heart-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
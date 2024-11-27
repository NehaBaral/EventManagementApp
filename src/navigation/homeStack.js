import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../components/home";
import { Ionicons } from '@expo/vector-icons';
import Favourite from "../components/favourite";
import { createStackNavigator } from "@react-navigation/stack";
import EventForm from "../components/eventForm";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeTab = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name='Home'
        component={Home}>
      </Stack.Screen>

      <Stack.Screen
        name='AddEvent'
        component={EventForm}
        options={{ title: 'Add Event' }}>
      </Stack.Screen>

    </Stack.Navigator>
  )
};

export default function HomeStack() {



  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#145a32',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
          <Tab.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Favourite"
            component={Favourite}
            options={{ headerShown: false }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
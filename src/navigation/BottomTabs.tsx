import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          // Defina explicitamente o tipo da constante como um dos ícones válidos
          let icon: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") icon = "home";
          else if (route.name === "Favorites") icon = "heart";
          else if (route.name === "Profile") icon = "person";
          else icon = "ellipse"; // fallback

          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

import "./src/services/firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { CommentProvider } from "./src/context/CommentContext";
import { ReviewProvider } from "./src/context/ReviewContext";

import AddReviewScreen from "./src/screens/AddReviewScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MapScreen from "./src/screens/MapScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ReviewDetailScreen from "./src/screens/ReviewDetailScreen";

import BottomTabs from "./src/navigation/BottomTabs";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="AddReview" component={AddReviewScreen} />
          <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ReviewProvider>
        <CommentProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </CommentProvider>
      </ReviewProvider>
    </AuthProvider>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./src/types/navigation";

import { ReviewProvider } from "./src/context/ReviewContext";
import AddReviewScreen from "./src/screens/AddReviewScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ReviewDetailScreen from "./src/screens/ReviewDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>() as ReturnType<
  typeof createNativeStackNavigator<RootStackParamList>
>;

export default function App() {
  return (
    <ReviewProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddReview" component={AddReviewScreen} />
          <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReviewProvider>
  );
}

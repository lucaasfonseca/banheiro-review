import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useReviews } from "../../context/ReviewContext";
import { RootStackParamList } from "../../types/navigation";
import { styles } from "./styles";

export default function MapScreen() {
  const { reviews } = useReviews();
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão negada para acessar localização.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (!location) {
    return <ActivityIndicator style={{ marginTop: 100 }} size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {reviews.map((review) => (
          <Marker
            key={review.id}
            coordinate={review.location}
            title={review.placeName}
            description={review.comment}
            onCalloutPress={() =>
              navigation.navigate("ReviewDetail", { review })
            }
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

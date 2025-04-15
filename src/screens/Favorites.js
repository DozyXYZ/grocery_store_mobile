import { View, Text, FlatList, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { NavHeader } from "../components/NavHeader";
import { NavFooter } from "../components/NavFooter";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { database, authentication } from "../../Firebase-Config";
import { ref, set, onValue } from "firebase/database";

const Favorites = () => {
  const route = useRoute();
  const { userData } = route.params || {};

  const user = authentication.currentUser;

  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        Alert.alert("Error", "User is not authenticated.");
        return;
      }

      const userFavoritesRef = ref(database, `users/${user.uid}/favorites`);
      const unsubscribe = onValue(userFavoritesRef, (snapshot) => {
        const data = snapshot.val();
        const favoritesArray = data
          ? Object.entries(data).map(([id, item]) => ({ ...item, id }))
          : [];
        setFavorites(favoritesArray);
      });

      return () => unsubscribe();
    }, [user])
  );

  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== itemId);
    setFavorites(updatedFavorites);

    const userFavoritesRef = ref(database, `users/${user.uid}/favorites`);
    const updatedFavoritesObject = updatedFavorites.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    set(userFavoritesRef, updatedFavoritesObject).catch((error) =>
      console.error("Error updating Firebase:", error)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <NavHeader title="Favorites" />

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {favorites.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites}
            renderItem={({ item }) => (
              <View
                style={{
                  height: responsiveHeight(16),
                  borderBottomWidth: 2,
                  borderBottomColor: ThemeColors.fifth,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100, resizeMode: "contain" }}
                    source={{
                      uri: item.img,
                    }}
                  />
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 2,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name="plus-square"
                    size={33}
                    color={ThemeColors.primary}
                    onPress={() => console.log("Pressed")}
                  />

                  <AntDesign
                    name="close"
                    size={20}
                    color={ThemeColors.third}
                    onPress={() => removeFromFavorites(item.id)}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: ThemeColors.primary, fontSize: 20 }}>
              Nothing catches your eye yet 😔
            </Text>
          </View>
        )}
      </View>

      <NavFooter userData={userData} />
    </SafeAreaView>
  );
};

export default Favorites;

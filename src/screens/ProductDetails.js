import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { GreenButton } from "../components/GreenButton";

const ProductDetails = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 20,
        backgroundColor: ThemeColors.secondary,
        marginTop: 10,
      }}
    >
      <StatusBar backgroundColor={ThemeColors.secondary} />

      <View style={{ flex: 1 }}>
        {/* Product Details */}
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Product Image */}
          <View>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIP.hu2_p7CM9UH_SG6Po8ZqXwHaFf?rs=1&pid=ImgDetMain",
              }}
              style={{
                height: 200,
                width: 300,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                alignSelf: "center",
                resizeMode: "contain",
              }}
            />
          </View>

          {/* Product Infos */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              backgroundColor: ThemeColors.secondary,
            }}
          >
            {/* Name + Favorite Icon */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "600" }}>
                Placeholder Name
              </Text>

              <MaterialIcons
                name="favorite-border"
                size={30}
                color={ThemeColors.third}
              />
            </View>

            {/* Units */}
            <Text
              style={{ marginTop: 5, fontSize: 20, color: ThemeColors.fourth }}
            >
              Placeholder Units
            </Text>

            {/* Price */}
            <Text
              style={{
                marginTop: 5,
                fontSize: 28,
                color: ThemeColors.fourth,
                fontWeight: "600",
              }}
            >
              Placeholder Price
            </Text>

            {/* Description Dropdown */}
            <CollapsibleSection title="Description">
              <Text
                style={{
                  fontSize: 16,
                  color: ThemeColors.fourth,
                  marginTop: 10,
                }}
              >
                Placeholder Description
              </Text>
            </CollapsibleSection>

            {/* Nutrition Dropdown */}
            <CollapsibleSection title="Nutrition per 100g">
              <Text
                style={{
                  fontSize: 16,
                  color: ThemeColors.fourth,
                  marginTop: 10,
                }}
              >
                Placeholder Nutrition
              </Text>
            </CollapsibleSection>
          </View>
        </ScrollView>

        {/* Add to Cart Button */}
        <GreenButton onPress={console.log("Pressed")} title="Add to Cart" />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

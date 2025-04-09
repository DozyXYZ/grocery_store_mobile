import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { GreenButton } from "../components/GreenButton";

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  console.log("Product Details:", product);

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
              source={{ uri: product.img }}
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
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </Text>

              <MaterialIcons
                name="favorite-border"
                size={30}
                color={ThemeColors.third}
                onPress={() => console.log("Favorite pressed")}
              />
            </View>

            {/* Units */}
            <Text
              style={{ marginTop: 5, fontSize: 20, color: ThemeColors.fourth }}
            >
              {product.units}
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
              €{product.price}
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
                {product.description}
              </Text>
            </CollapsibleSection>

            {/* Nutrition Dropdown */}
            <CollapsibleSection title="Nutrition per 100g">
              {Object.entries(product.nutrition).map(([key, value]) => (
                <Text
                  key={key}
                  style={{
                    fontSize: 16,
                    color: ThemeColors.fourth,
                    marginTop: 5,
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </Text>
              ))}
            </CollapsibleSection>
          </View>
        </ScrollView>

        {/* Add to Cart Button */}
        <GreenButton
          onPress={console.log("Pressed")}
          title="Add to Cart"
          style={{ marginTop: 5 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { StoreProductTitle } from "../components/StoreProductTitle";

const Store = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20 }}>
          <StoreProductTitle title="Fruits" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Store;

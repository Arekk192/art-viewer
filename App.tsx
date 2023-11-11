import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./components/Explore";

export default function App() {
  const Tab = createBottomTabNavigator();

  // https://api.artic.edu/api/v1/artworks?page=1&limit=15

  const Search = () => {
    return <View />;
  };

  const Favourite = () => {
    return <View />;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{ headerTitleAlign: "center" }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{ headerTitleAlign: "center" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

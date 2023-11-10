import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Tab = createBottomTabNavigator();

  const Explore = () => {
    return <View />;
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

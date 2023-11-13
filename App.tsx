import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./components/Explore";
import Search from "./components/Search";
import Favourite from "./components/Favourite";

export default function App() {
  const Tab = createBottomTabNavigator();

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

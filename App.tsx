import { useEffect } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import {
  CompositeNavigationProp,
  NavigationContainer,
} from "@react-navigation/native";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Svg, Path } from "react-native-svg";
import * as NavigationBar from "expo-navigation-bar";
import Explore from "./src/screens/Explore";
import Search from "./src/screens/Search";
import Favourite from "./src/screens/Favourite";
import Artwork from "./src/screens/components/Artwork";
import colors from "./src/static/colors";
import Author from "./src/screens/components/Author";

export type ArtworkData = {
  id: number;
  title: string;
  artist_display: string;
  artist_id: number;
  date_display: string;
  image_id: string;
  dimensions: string;
  description: string | null;
};

export type Author = {
  artist_id: number;
  title: string;
  birth_date: string | null;
  death_date: string | null;
  description: string;
  is_artist: boolean;
};

export type ScreenNavigationParamList = {
  ExploreScreen: undefined;
  SearchScreen: undefined;
  FavouriteScreen: undefined;
  Artwork: { artwork: ArtworkData };
  Author: {
    artwork: ArtworkData;
    author: Author;
  };
};

export type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<ScreenNavigationParamList, "Artwork">,
  BottomTabNavigationProp<RootStackParamList>
>;

type RootStackParamList = {
  Explore: undefined;
  Search: undefined;
  Favourite: undefined;
};

type IconProps = {
  screen: "Explore" | "Search" | "Favourite";
  focused: boolean;
};

export default function App() {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  const ScreenTab = createBottomTabNavigator<ScreenNavigationParamList>();

  useEffect(() => {
    (async () => {
      await NavigationBar.setBackgroundColorAsync(colors.black);
    })();
  }, []);

  const Icon = ({ screen, focused }: IconProps) => {
    if (screen == "Explore")
      return (
        <Svg viewBox="0 0 576 512" style={styles.icon}>
          <Path
            fill={focused ? colors.blue : colors.white}
            d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
          />
        </Svg>
      );
    else if (screen == "Search")
      return (
        <Svg viewBox="0 0 512 512" style={styles.icon}>
          <Path
            fill={focused ? colors.blue : colors.white}
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </Svg>
      );
    else if (screen == "Favourite")
      return (
        <Svg viewBox="0 0 512 512" style={styles.icon}>
          <Path
            fill={focused ? colors.blue : colors.white}
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          />
        </Svg>
      );
  };

  const ExploreScreen = () => {
    return (
      <ScreenTab.Navigator tabBar={() => <></>}>
        <ScreenTab.Screen
          name="ExploreScreen"
          component={Explore}
          options={{
            title: "Explore",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <ScreenTab.Screen
          name="Artwork"
          component={Artwork}
          options={{ headerShown: false }}
        />
        <ScreenTab.Screen
          name="Author"
          component={Author}
          options={{ headerShown: false }}
        />
      </ScreenTab.Navigator>
    );
  };

  const SearchScreen = () => {
    return (
      <ScreenTab.Navigator tabBar={() => <></>}>
        <ScreenTab.Screen
          name="SearchScreen"
          component={Search}
          options={{
            title: "Search",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <ScreenTab.Screen
          name="Artwork"
          component={Artwork}
          options={{ headerShown: false }}
        />
        <ScreenTab.Screen
          name="Author"
          component={Author}
          options={{ headerShown: false }}
        />
      </ScreenTab.Navigator>
    );
  };

  const FavouriteScreen = () => {
    return (
      <ScreenTab.Navigator tabBar={() => <></>}>
        <ScreenTab.Screen
          name="FavouriteScreen"
          component={Favourite}
          options={{
            title: "Favourite",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <ScreenTab.Screen
          name="Artwork"
          component={Artwork}
          options={{ headerShown: false }}
        />
        <ScreenTab.Screen
          name="Author"
          component={Author}
          options={{ headerShown: false }}
        />
      </ScreenTab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused }) => (
              <Icon screen="Explore" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused }) => (
              <Icon screen="Search" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused }) => (
              <Icon screen="Favourite" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: { width: 24, height: 24 },
  tabBar: { backgroundColor: colors.black, height: 56, paddingTop: 6 },
  header: {
    height: Platform.OS === "android" ? StatusBar.currentHeight! + 84 : 84,
    backgroundColor: colors.black,
  },
  headerTitle: { color: colors.white, paddingTop: 4 },
});

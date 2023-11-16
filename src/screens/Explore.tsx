import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Item from "./components/Item";
import colors from "../static/colors";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { ArtworkData, RootStackParamList } from "../../App";

type ExploreScreenNavigationParamList = {
  Explore: undefined;
  Artwork: { artwork: ArtworkData };
};

type ExploreHomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ExploreScreenNavigationParamList, "Artwork">,
  BottomTabNavigationProp<RootStackParamList>
>;

export default function Explore() {
  const [data, setData] = useState<ArtworkData[]>();
  const fields =
    "id,title,artist_display,date_display,image_id,dimensions,description";
  const [paginationURL, setPaginationURL] = useState<string>(
    `https://api.artic.edu/api/v1/artworks/?page=${1}&fields=${fields}&limit=${15}`
  );
  const navigation = useNavigation<ExploreHomeScreenNavigationProp>();

  const fetchData = async () => {
    try {
      const response = await fetch(paginationURL);
      const json = await response.json();
      setData(data ? data.concat(json["data"]) : json["data"]);
      setPaginationURL(json["pagination"]["next_url"]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            data={item}
            onPress={() => navigation.navigate("Artwork", { artwork: item })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.padding} />}
        ListHeaderComponent={() => <View style={styles.padding} />}
        ListFooterComponent={() => <View style={styles.padding} />}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        onEndReached={() => fetchData()}
        keyExtractor={(_, index) => index.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: colors.darkBlack,
  },
  padding: { height: 10, flex: 1 },
});

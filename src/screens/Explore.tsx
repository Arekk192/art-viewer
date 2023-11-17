import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, StyleSheet } from "react-native";
import Item from "./components/Item";
import colors from "../static/colors";
import type { ArtworkData, ScreenNavigationProps } from "../../App";

export default function Explore() {
  const navigation = useNavigation<ScreenNavigationProps>();
  const [data, setData] = useState<ArtworkData[]>();
  const fields =
    "id,title,artist_display,artist_id,date_display,image_id,dimensions,description,latitude,longitude";
  const [paginationURL, setPaginationURL] = useState<string>(
    `https://api.artic.edu/api/v1/artworks/?page=${1}&fields=${fields}&limit=${15}`
  );

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

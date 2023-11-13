import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Item from "./Item";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ArtworkData = {
  _score: number | null;
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string;
  dimensions: string;
  description: string | null;
};

export default function Explore() {
  const [data, setData] = useState<ArtworkData[]>();
  const [page, setPage] = useState(1);
  const [favouritesID, setFavouritesID] = useState<number[]>();

  useEffect(() => {
    (async () => {
      try {
        const fields =
          "id,title,artist_display,date_display,image_id,dimensions,description";
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/?page=${page}&fields=${fields}&limit=${15}`
        );
        const json = await response.json();
        setData(data ? data.concat(json.data) : json.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const keys = await AsyncStorage.getAllKeys();
        setFavouritesID(keys.map((el) => parseInt(el)) as number[]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item data={item} favourites={favouritesID as number[]} />
        )}
        ItemSeparatorComponent={() => <View style={styles.padding} />}
        ListHeaderComponent={() => <View style={styles.padding} />}
        ListFooterComponent={() => <View style={styles.padding} />}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        onEndReached={() => setPage(page + 1)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  flatlist: { flex: 1, paddingHorizontal: 12 },
  padding: { height: 8, flex: 1 },
});

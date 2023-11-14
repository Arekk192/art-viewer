import { View, FlatList, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Item from "./components/Item";
import colors from "../static/colors";

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

export default function Favourite() {
  const [favourites, setFavourites] = useState<ArtworkData[]>();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const dataArr = [];
          const keys = await AsyncStorage.getAllKeys();

          for (let i = 0; i < keys.length; i++) {
            const id = keys[i];
            const itemData = await AsyncStorage.getItem(id);
            dataArr.push({ id: id, ...JSON.parse(itemData as string) });
          }

          setFavourites(dataArr as unknown as ArtworkData[]);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [])
  );

  return (
    <>
      <FlatList
        data={favourites}
        renderItem={({ item, index }) => (
          <Item
            data={item}
            onClick={async () => {
              await AsyncStorage.removeItem(item.id.toString());
              setFavourites(favourites?.filter((_, i) => i != index));
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.padding} />}
        ListHeaderComponent={() => <View style={styles.padding} />}
        ListFooterComponent={() => <View style={styles.padding} />}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
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
  padding: { height: 8, flex: 1 },
});

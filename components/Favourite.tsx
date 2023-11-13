import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
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

export default function Favourite() {
  const [favourites, setFavourites] = useState<ArtworkData[]>();

  useEffect(() => {
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
  }, []);

  return (
    <>
      {favourites?.map((el, i) => {
        return (
          <View key={i}>
            <Text>{el.title}</Text>
          </View>
        );
      })}
    </>
  );
}

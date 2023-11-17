import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "./components/Item";
import colors from "../static/colors";
import type { ArtworkData, ScreenNavigationProps } from "../../App";

export default function Favourite() {
  const [favourites, setFavourites] = useState<ArtworkData[]>();
  const navigation = useNavigation<ScreenNavigationProps>();

  useFocusEffect(
    useCallback(() => {
      // getting data from async storage
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
            onPress={() => navigation.navigate("Artwork", { artwork: item })}
            buttonOnPress={async () => {
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

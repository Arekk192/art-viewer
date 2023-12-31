import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "./components/Item";
import colors from "../static/colors";
import type { ArtworkData, ScreenNavigationProps } from "../../App";
import BigList from "react-native-big-list";

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
      <BigList
        data={favourites}
        renderItem={({ item, index }) => (
          <>
            <Item
              data={item}
              onPress={() => navigation.navigate("Artwork", { artwork: item })}
              buttonOnPress={async () => {
                await AsyncStorage.removeItem(item.id.toString());
                setFavourites(favourites?.filter((_, i) => i != index));
              }}
            />
            <View style={styles.padding} />
          </>
        )}
        itemHeight={90}
        sections={null}
        renderHeader={() => <View style={styles.padding} />}
        headerHeight={10}
        renderFooter={() => <View style={styles.padding} />}
        footerHeight={10}
        style={styles.flatlist}
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

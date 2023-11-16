import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Item from "./components/Item";
import colors from "../static/colors";
import { useNavigation } from "@react-navigation/native";
import type { ArtworkData, ScreenNavigationProps } from "../../App";

export default function Search() {
  const navigation = useNavigation<ScreenNavigationProps>();
  const [data, setData] = useState<ArtworkData[]>();
  const [query, setQuery] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const fields =
          "id,title,artist_display,date_display,image_id,dimensions,description";
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=${fields}`
        );
        const json = await res.json();
        setData(json.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={query}
            onChange={(e) => {
              // e.preventDefault();
              setIsLoading(true);
              setQuery(e.nativeEvent.text);
            }}
            style={styles.textInput}
          />
        </View>
        {!isLoading ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item
                data={item}
                onPress={() =>
                  navigation.navigate("Artwork", { artwork: item })
                }
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.padding} />}
            ListHeaderComponent={() => <View style={styles.padding} />}
            ListFooterComponent={() => <View style={styles.padding} />}
            showsVerticalScrollIndicator={false}
            style={styles.flatlist}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <></>
        )}
      </View>
    </>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBlack },
  flatlist: {
    flex: 1,
    paddingHorizontal: 12,
  },
  padding: { height: 8, flex: 1 },
  textInputContainer: {
    height: 36,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  textInput: {
    margin: "auto",
    width: screenWidth - 24,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.darkerGray,
    borderColor: colors.darkGray,
    color: colors.white,
    paddingHorizontal: 8,
  },
});

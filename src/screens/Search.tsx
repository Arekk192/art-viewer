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
import Artwork from "./components/Artwork";

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

export default function Search() {
  const [query, setQuery] = useState<string>();
  const [data, setData] = useState<ArtworkData[]>();
  const [artwork, setArtwork] = useState<ArtworkData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      {artwork ? (
        <Artwork artwork={artwork} onPress={() => setArtwork(null)} />
      ) : (
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
                <Item data={item} onPress={() => setArtwork(item)} />
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
      )}
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

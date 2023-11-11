import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

type ArtworkData = Array<{
  id: string;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string;
  dimensions: string;
  description: string;
}>;

export default function Explore() {
  const [data, setData] = useState<ArtworkData>();

  useEffect(() => {
    (async () => {
      try {
        const fields =
          "id,title,artist_display,date_display,image_id,dimensions,description";
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/?fields=${fields}&limit=15`
        );
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatlistItem}>
              <View style={styles.artworkContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/600,/0/default.jpg`,
                    }}
                    style={styles.artworkImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.artworkDataContainer}>
                  <Text style={styles.artworkTitle}>{item.title}</Text>
                  <Text style={styles.artworkArtist}>
                    {item.artist_display.split("\n")[0]}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
      />
    </>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {},
  flatlist: {
    flex: 1,
    paddingHorizontal: 12,
    // paddingVertical: 8,
  },
  flatlistItem: { paddingVertical: 4 },
  imageContainer: {
    backgroundColor: "deepskyblue",
    borderRadius: 6,
    overflow: "hidden",
  },
  artworkContainer: {
    flex: 1,
    height: 80,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "green",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  artworkDataContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 4,
    borderRadius: 14,
  },
  artworkImage: {
    width: 72,
    height: 72,
  },
  artworkTitle: {
    fontSize: 14,
    color: "#f2f2f2",
  },
  artworkArtist: {
    fontSize: 10,
  },
});

import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

type Data = {
  data: {
    _score: string;
    id: string;
    title: string;
    artist_display: string;
    date_display: string;
    image_id: string;
    dimensions: string;
    description: string;
  };
};

export default function Item({ data }: Data) {
  return (
    <View style={styles.artworkContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/600,/0/default.jpg`,
          }}
          style={styles.artworkImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.artworkDataContainer}>
        <Text style={styles.artworkTitle}>{data.title}</Text>
        <Text style={styles.artworkArtist}>
          {data.artist_display.split("\n")[0]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  artworkImage: { width: 72, height: 72 },
  imageContainer: {
    backgroundColor: "deepskyblue",
    borderRadius: 6,
    overflow: "hidden",
  },
  artworkTitle: {
    fontSize: 14,
    color: "#f2f2f2",
  },
  artworkArtist: {
    fontSize: 10,
  },
});

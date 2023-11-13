import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";

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

type Data = {
  data: ArtworkData;
  favourites: number[];
};

export default React.memo(function Item({ data, favourites }: Data) {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    (() => {
      if (favourites) {
        for (let i = 0; i < favourites.length; i++) {
          if (favourites[i] == data.id) setIsFavourite(true);
        }
      }
    })();
  }, []);

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
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(data.id);
        }}
      >
        <View
          style={[
            styles.addToFavouritesButton,
            {
              backgroundColor: isFavourite ? "blue" : "deepskyblue",
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
});

const styles = StyleSheet.create({
  artworkContainer: {
    flex: 1,
    height: 80,
    // paddingHorizontal: 4,
    paddingLeft: 4,
    paddingRight: 8,
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
  addToFavouritesButton: { width: 28, height: 28, backgroundColor: "blue" },
});

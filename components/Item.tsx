import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

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
  favourites: ArtworkData[];
};

export default React.memo(function Item({ data, favourites }: Data) {
  const checkFavourites = () => {
    let isInFav = false;
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id == data.id) isInFav = true;
    }
    return isInFav;
  };

  const [click, setClick] = useState(true);
  const isInFavourites = checkFavourites();

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
          setClick(!click);
          console.log(data.id);
        }}
      >
        <View
          style={[
            styles.addToFavouritesButton,
            {
              backgroundColor: isInFavourites && click ? "blue" : "deepskyblue",
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

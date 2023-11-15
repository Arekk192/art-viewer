import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import colors from "../../static/colors";

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

export default function Artwork({
  artwork,
  onPress,
}: {
  artwork: ArtworkData;
  onPress: () => void;
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => onPress()}>
          <Text style={styles.backButton}>Go back</Text>
        </TouchableWithoutFeedback>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.date}>{artwork.date_display}</Text>
        <Text style={styles.artist}>by {artwork.artist_display}</Text>
        <Text style={styles.description}>{artwork.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12 },
  backButton: {
    fontSize: 16,
    padding: 8,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 8,
    color: colors.blue,
    fontWeight: "bold",
  },
  imageContainer: {
    backgroundColor: colors.black,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 20,
  },
  image: {
    // width: screenWidth - 24,
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    flex: 1,
    fontSize: 32,
  },
  date: {
    flex: 1,
    fontSize: 16,
    marginTop: 20,
  },
  artist: { flex: 1, fontSize: 16, marginTop: 20 },
  description: { flex: 1, fontSize: 14, marginVertical: 20 },
});

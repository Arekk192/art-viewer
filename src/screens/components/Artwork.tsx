import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../../static/colors";
import RenderHtml from "react-native-render-html";

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
        {artwork.description ? (
          <RenderHtml
            baseStyle={{ fontSize: 16, color: colors.darkBlack }}
            contentWidth={Dimensions.get("window").width - 24}
            source={{ html: artwork.description as string }}
          />
        ) : (
          <></>
        )}
        <Text style={styles.dimensions}>{artwork.dimensions}</Text>
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
    backgroundColor: colors.darkBlack,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    flex: 1,
    fontSize: 32,
    color: colors.darkBlack,
  },
  date: {
    flex: 1,
    fontSize: 16,
    marginTop: 20,
    color: colors.darkGray,
  },
  artist: {
    flex: 1,
    fontSize: 16,
    marginVertical: 20,
    color: colors.darkBlack,
  },
  dimensions: {
    flex: 1,
    fontSize: 16,
    marginVertical: 20,
    textAlign: "center",
    color: colors.darkGray,
  },
});

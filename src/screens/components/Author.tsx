import React, { useCallback, useState } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { Author, ScreenNavigationParamList } from "../../../App";
import colors from "../../static/colors";
import RenderHTML from "react-native-render-html";
import { useFocusEffect } from "@react-navigation/native";

type Props = BottomTabScreenProps<ScreenNavigationParamList, "Author">;

type AuthorArtwork = {
  id: number;
  title: string;
  artist_id: number;
  image_id: string;
};

type Artwork = {
  title: string;
  image_id: string;
};

export default function Author({ navigation, route }: Props) {
  const [authorArtworks, setAuthorArtworks] = useState<AuthorArtwork[]>();
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null);
  const artwork = route.params.artwork;
  const author = route.params.author;

  useFocusEffect(
    useCallback(() => {
      // query for getting few (max 32) author artworks

      (async () => {
        try {
          const fields = "id,title,artist_id,image_id";
          const url = `https://api.artic.edu/api/v1/artworks/search?q=${
            author.title
          }&fields=${fields}&limit=${32}&page=${1}`;

          const res = await fetch(url);
          const json = await res.json();

          const authorArtworks: AuthorArtwork[] = [];
          json["data"].forEach((el: AuthorArtwork) => {
            if (el.artist_id == artwork.artist_id) authorArtworks.push(el);
          });

          setAuthorArtworks(authorArtworks);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [author])
  );

  return (
    <View style={styles.container}>
      {/* author's artwork preview */}
      {currentArtwork ? (
        <TouchableWithoutFeedback onPress={() => setCurrentArtwork(null)}>
          <View style={styles.currentArtworkContainer}>
            <View style={styles.currentArtworkBackground} />
            <View style={styles.currentArtworkImageContainer}>
              <Image
                source={{
                  uri: `https://www.artic.edu/iiif/2/${currentArtwork.image_id}/full/600,/0/default.jpg`,
                }}
                style={styles.currentArtworkImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.currentArtworkTitle}>
              {currentArtwork.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <></>
      )}

      {/* author data */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.buttonsContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Artwork", { artwork: artwork })}
          >
            <Text style={styles.button}>Go back</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.authorName}>
          {author.title ? author.title : ""}
        </Text>

        {author.birth_date && author.death_date ? (
          <Text style={styles.authorLife}>
            {`${author.birth_date} - ${author.death_date}`}
          </Text>
        ) : author.birth_date ? (
          <Text style={styles.authorLife}>{author.birth_date}</Text>
        ) : (
          <></>
        )}

        {author.description ? (
          <RenderHTML
            baseStyle={{ fontSize: 16, color: colors.darkBlack }}
            contentWidth={Dimensions.get("window").width - 24}
            source={{ html: author.description }}
          />
        ) : (
          <></>
        )}

        {/* author artworks */}
        <Text style={styles.artworksText}>Most popular artworks:</Text>
        {authorArtworks?.map((el, i) => {
          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() =>
                setCurrentArtwork({
                  image_id: el.image_id,
                  title: el.title,
                })
              }
            >
              <View style={styles.artworkContainer}>
                <View style={styles.artworkImageContainer}>
                  <Image
                    source={{
                      uri: `https://www.artic.edu/iiif/2/${el.image_id}/full/600,/0/default.jpg`,
                    }}
                    style={styles.artworkImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.artworkImageTitle}>
                  {el.title.length >= 62
                    ? `${el.title.slice(0, 62)}...`
                    : el.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const screenSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! : 0,
  },
  //#region buttons
  buttonsContainer: {
    paddingTop: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    fontSize: 16,
    padding: 8,
    paddingBottom: 8,
    color: colors.blue,
    fontWeight: "bold",
  },
  //#endregion

  //#region author data styles
  authorName: {
    marginTop: 20,
    fontFamily: "Roboto-Regular",
    fontSize: 32,
    color: colors.darkBlack,
  },
  authorLife: {
    marginVertical: 12,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: colors.darkGray,
  },
  artworksText: {
    marginTop: 12,
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
  artworkContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 8,
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 4,
    backgroundColor: colors.lightGray,
  },
  artworkImageContainer: {
    backgroundColor: colors.darkGray,
    borderRadius: 6,
    elevation: 4,
  },
  artworkImage: { width: 60, height: 60 },
  artworkImageTitle: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: colors.darkBlack,
  },
  //#endregion

  //#region styles for artwork preview
  currentArtworkContainer: {
    position: "absolute",
    zIndex: 1,
    width: screenSize.width,
    height: screenSize.height,
    padding: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 12 : 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  currentArtworkBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.darkBlack,
    opacity: 0.925,
  },
  currentArtworkImageContainer: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 24,
    overflow: "hidden",
  },
  currentArtworkImage: {
    width: screenSize.width - 32,
    aspectRatio: 1,
    zIndex: 2,
  },
  currentArtworkTitle: {
    zIndex: 2,
    fontFamily: "Roboto-Regular",
    fontSize: 32,
    color: colors.white,
  },
  //#endregion
});

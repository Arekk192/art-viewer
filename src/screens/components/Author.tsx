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
  const artwork = route.params.artwork;
  const author = route.params.author;
  const [authorArtworks, setAuthorArtworks] = useState<AuthorArtwork[]>();

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.buttonsContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Artwork", { artwork: artwork })}
          >
            <Text style={styles.button}>Go back</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text style={{ marginTop: 6 }}>{author.artist_id}</Text>
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

        <Text>Most popular artworks:</Text>
        {authorArtworks?.map((el, i) => {
          return (
            <View key={i} style={styles.artworkContainer}>
              <Image
                source={{
                  uri: `https://www.artic.edu/iiif/2/${el.image_id}/full/600,/0/default.jpg`,
                }}
                style={styles.artworkImage}
                resizeMode="contain"
              />
              <Text style={{ flex: 1 }}>{el.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! : 0,
  },
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
  authorName: { marginVertical: 6 },
  artworkContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 8,
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 4,
    backgroundColor: colors.gray,
  },
  artworkImage: { width: 60, height: 60 },
  authorLife: { marginVertical: 6 },
});

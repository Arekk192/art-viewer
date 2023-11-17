import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../static/colors";
import RenderHtml from "react-native-render-html";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { Author, ScreenNavigationParamList } from "../../../App";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

type Props = BottomTabScreenProps<ScreenNavigationParamList, "Artwork">;

export default function Artwork({ navigation, route }: Props) {
  const [author, setAuthor] = useState<Author>();
  const artwork = route.params.artwork;

  useEffect(() => {
    (async () => {
      try {
        const fields = "id,title,birth_date,death_date,description,is_artist";
        const url = `https://api.artic.edu/api/v1/agents/${artwork.artist_id}?fields=${fields}`;
        const response = await fetch(url);
        const json = await response.json();
        setAuthor(json["data"]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [artwork]);

  return (
    <View style={styles.container}>
      <Svg width={screenWidth} height={20} style={styles.gradientTop}>
        <Defs>
          <LinearGradient id="rect" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.white} stopOpacity="1" />
            <Stop offset="1" stopColor={colors.white} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={screenWidth} height="20" fill="url(#rect)" />
      </Svg>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.buttonsContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.button}>Go back</Text>
          </TouchableWithoutFeedback>
          {author?.is_artist ? (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Author", {
                  author: author as Author,
                  artwork: artwork,
                })
              }
            >
              <Text style={styles.button}>Author</Text>
            </TouchableWithoutFeedback>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://www.artic.edu/iiif/2/${route.params.artwork.image_id}/full/600,/0/default.jpg`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>{artwork.title}</Text>
        <Text style={styles.date}>{artwork.date_display}</Text>
        <Text style={styles.artist}>{artwork.artist_display}</Text>
        {artwork.description ? (
          <RenderHtml
            baseStyle={{
              fontSize: 16,
              color: colors.darkBlack,
              fontFamily: "Roboto-Regular",
            }}
            contentWidth={Dimensions.get("window").width - 24}
            source={{ html: artwork.description as string }}
          />
        ) : (
          <></>
        )}
        <Text style={styles.dimensions}>{artwork.dimensions}</Text>
      </ScrollView>
      <Svg width={screenWidth} height={32} style={styles.gradientBottom}>
        <Defs>
          <LinearGradient id="rect" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.white} stopOpacity="0" />
            <Stop offset="1" stopColor={colors.white} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={screenWidth} height="32" fill="url(#rect)" />
      </Svg>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! : 0,
  },
  gradientTop: {
    position: "absolute",
    zIndex: 1,
    top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  gradientBottom: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
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
    fontFamily: "Roboto-Bold",
  },
  imageContainer: {
    backgroundColor: colors.darkBlack,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 20,
    elevation: 4,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    flex: 1,
    marginTop: 6,
    marginBottom: 2,
    fontSize: 32,
    fontFamily: "Sabon",
    color: colors.darkBlack,
  },
  date: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop: 20,
    color: colors.darkGray,
  },
  artist: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginVertical: 20,
    color: colors.darkBlack,
  },
  dimensions: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 32,
    textAlign: "center",
    color: colors.darkGray,
  },
});

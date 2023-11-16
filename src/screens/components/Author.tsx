import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  Dimensions,
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

type Props = BottomTabScreenProps<ScreenNavigationParamList, "Author">;

export default function Author({ navigation, route }: Props) {
  const artwork = route.params.artwork;
  const author = route.params.author;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Artwork", { artwork: artwork })}
          >
            <Text style={styles.button}>Go back</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text>{author.artist_id}</Text>
        <Text>{author.title ? author.title : ""}</Text>
        <Text>
          {author.birth_date ? `birth date: ${author!.birth_date}` : ""}
        </Text>
        <Text>
          {author.death_date ? `death date: ${author!.death_date}` : ""}
        </Text>
        {author.description ? (
          <RenderHTML
            baseStyle={{ fontSize: 16, color: colors.darkBlack }}
            contentWidth={Dimensions.get("window").width - 24}
            source={{ html: author.description }}
          />
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
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
});

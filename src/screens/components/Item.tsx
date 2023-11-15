import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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

type Data = {
  data: ArtworkData;
  buttonOnPress?: () => void;
  onPress: () => void;
};

export default React.memo(function Item({
  data,
  buttonOnPress,
  onPress,
}: Data) {
  const navigaion = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          let _isFavourite = false;
          const keys = await AsyncStorage.getAllKeys();
          keys.forEach((key) => {
            if (key === data.id.toString()) _isFavourite = true;
          });
          setIsFavourite(_isFavourite);
        } catch (error) {
          console.error(error);
        }
      })();
    }, [])
  );

  const defaultButtonOnPress = async () => {
    const { id, ...object } = data;
    !isFavourite
      ? await AsyncStorage.setItem(id.toString(), JSON.stringify(object))
      : await AsyncStorage.removeItem(id.toString());
    setIsFavourite(!isFavourite);
  };

  return (
    <TouchableWithoutFeedback onLongPress={() => onPress()}>
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
            {data.artist_display?.split("\n")[0]}
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={
            buttonOnPress === undefined
              ? () => defaultButtonOnPress()
              : () => buttonOnPress!()
          }
        >
          <Svg viewBox="0 0 512 512" style={styles.addToFavouritesButton}>
            <Path
              fill={isFavourite ? colors.red : colors.black}
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </Svg>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  artworkContainer: {
    flex: 1,
    height: 80,
    paddingLeft: 4,
    paddingRight: 8,
    paddingVertical: 4,
    backgroundColor: colors.darkerGray,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  artworkDataContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
  },
  artworkImage: { width: 72, height: 72 },
  imageContainer: {
    backgroundColor: colors.darkBlack,
    borderRadius: 6,
    overflow: "hidden",
  },
  artworkTitle: {
    fontSize: 14,
    color: colors.white,
  },
  artworkArtist: {
    fontSize: 10,
  },
  addToFavouritesButton: { width: 28, height: 28 },
});
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Item from "./components/Item";
import colors from "../static/colors";
import type { ArtworkData, ScreenNavigationProps } from "../../App";
import BigList from "react-native-big-list";

export default function Explore() {
  const navigation = useNavigation<ScreenNavigationProps>();
  const [data, setData] = useState<ArtworkData[]>();

  // fields used in fetch for response optimization (fetching only required data)
  const fields =
    "id,title,artist_display,artist_id,date_display,image_id,dimensions,description,latitude,longitude";

  const [paginationURL, setPaginationURL] = useState<string>(
    `https://api.artic.edu/api/v1/artworks/?page=${1}&fields=${fields}&limit=${15}`
  );

  // function which add next 15 artworks to state
  const fetchData = async () => {
    try {
      const response = await fetch(paginationURL);
      const json = await response.json();
      setData(data ? data.concat(json["data"]) : json["data"]);
      setPaginationURL(json["pagination"]["next_url"]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BigList
        data={data}
        renderItem={({ item }) => (
          <>
            <Item
              data={item}
              onPress={() => navigation.navigate("Artwork", { artwork: item })}
            />
            <View style={styles.padding} />
          </>
        )}
        itemHeight={90}
        sections={null}
        renderHeader={() => <View style={styles.padding} />}
        headerHeight={10}
        renderFooter={() => <View style={styles.padding} />}
        footerHeight={10}
        style={styles.flatlist}
        onEndReached={() => fetchData()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: colors.darkBlack,
  },
  padding: { height: 10, flex: 1 },
});

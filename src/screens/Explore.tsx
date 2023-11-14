import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Item from "./components/Item";
import colors from "../static/colors";

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

export default function Explore() {
  const [data, setData] = useState<ArtworkData[]>();
  const fields =
    "id,title,artist_display,date_display,image_id,dimensions,description";
  const [paginationURL, setPaginationURL] = useState<string>(
    `https://api.artic.edu/api/v1/artworks/?page=${1}&fields=${fields}&limit=${15}`
  );

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
      <FlatList
        data={data}
        renderItem={({ item }) => <Item data={item} />}
        ItemSeparatorComponent={() => <View style={styles.padding} />}
        ListHeaderComponent={() => <View style={styles.padding} />}
        ListFooterComponent={() => <View style={styles.padding} />}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        onEndReached={() => fetchData()}
        keyExtractor={(_, index) => index.toString()}
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

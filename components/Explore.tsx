import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Item from "./Item";

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
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState<ArtworkData[]>([
    {
      _score: null,
      id: 204589,
      title:
        "Landscape in the Style of Ancient Masters: after Fang Congyi (active c. 1340-80)",
      date_display: "Ming dynasty (1368\u20131644), dated 1642",
      artist_display: "Lan Ying (Chinese, 1585-c. 1664)",
      description: null,
      dimensions: "31 \u00d7 40.7 cm (12 \u00d7 16 in.)",
      image_id: "0605c503-35c8-e2be-71f8-17189dc4a4b3",
    },
    {
      _score: null,
      id: 204588,
      title:
        "Landscape in the Style of Ancient Masters: after Gao Shangshu, following Dong Yuan (active 937-975) and Ju Ran, and later in the style of Mi Fu (1051_-1107)",
      date_display: "Ming dynasty (1368\u20131644), dated 1642",
      artist_display: "Lan Ying (Chinese, 1585-c. 1664)",
      description: null,
      dimensions: "31 \u00d7 40.7 cm (12 \u00d7 16 in.)",
      image_id: "debf5973-c53b-0292-9392-c494b034c90d",
    },
    {
      _score: null,
      id: 204587,
      title:
        "Landscape in the Style of Ancient Masters: after Ni Zan (1301-1374)",
      date_display: "Ming dynasty (1368\u20131644), dated 1642",
      artist_display: "Lan Ying (Chinese, 1585-c. 1664)",
      description: null,
      dimensions: "31 \u00d7 40.7 cm (12 \u00d7 16 in.)",
      image_id: "f900542a-7802-26cb-f93a-0ac000bed024",
    },
    {
      _score: null,
      id: 204586,
      title: "Landscape in the Style of Ancient Masters: Songxuezhai Lan Ying",
      date_display: "Ming dynasty (1368\u20131644), dated 1642",
      artist_display: "Lan Ying (Chinese, 1585-c. 1664)",
      description: null,
      dimensions: "31 \u00d7 40.7 cm (12 \u00d7 16 in.)",
      image_id: "b79cf5f8-584a-4d77-60b7-11e7c71c31f7",
    },
    {
      _score: null,
      id: 254133,
      title: "Diary: Aug. 19th, '76",
      date_display: "1976",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "71.1 \u00d7 46.9 cm (28 \u00d7 18 1/2 in.)",
      image_id: "c3e2067e-d021-0c18-bdf1-b42625347858",
    },
    {
      _score: null,
      id: 254132,
      title: "Diary' Sept.1st '74",
      date_display: "1974",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "46.9 \u00d7 64.1 cm (18 1/2 \u00d7 25 1/4 in.)",
      image_id: "69be72a8-0afa-d280-6d05-d3482947febb",
    },
    {
      _score: null,
      id: 254131,
      title: "Diary; May 39th, '70 AP",
      date_display: "1970",
      artist_display: "Noda Tetsuya (b.1940) \nJapanese",
      description: null,
      dimensions: "44.4 \u00d7 44.4 cm (17 1/2 \u00d7 17 1/2 in.)",
      image_id: "cb031f7c-9167-d616-2478-a7454756d8c9",
    },
    {
      _score: null,
      id: 254136,
      title: "Diary: Aug. 7th, '91",
      date_display: "1991",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "54.6 \u00d7 30.4 cm (21 1/4 \u00d7 12 in.)",
      image_id: "ca9a1d48-2810-2ddc-ee90-aeee1157d16b",
    },
    {
      _score: null,
      id: 254135,
      title: "Diary: Feb. 9th, '84, in Ueno",
      date_display: "1984",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "57.1 \u00d7 88.9 cm (22 1/2 \u00d7 35 in.)",
      image_id: "1f260ade-db55-f78a-7a99-071d667d390d",
    },
    {
      _score: null,
      id: 254134,
      title: "Diary: Feb. 2nd, '78",
      date_display: "1978",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "44.4 \u00d7 64.7 cm (17 1/2 \u00d7 25 1/2 in.)",
      image_id: "97635317-48d3-dc13-d9bc-492ad5893008",
    },
    {
      _score: null,
      id: 254140,
      title: "Diary: Sep. 16th '01, in Israel",
      date_display: "2001",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "48.2 \u00d7 79.4 cm (19 \u00d7 31 1/4 in.)",
      image_id: "39401af1-8582-0d99-943e-edd2ba5a4264",
    },
    {
      _score: null,
      id: 254139,
      title: "Diary: Aug. 6th '00",
      date_display: "2000",
      artist_display: "Noda Tetsuya (b. 1940)\nJapanese",
      description: null,
      dimensions: "49.5 \u00d7 80 cm (19 1/2 \u00d7 31 1/2 in.)",
      image_id: "c1ce87ea-4725-9b60-47ad-ef4ff29c419e",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const fields =
          "id,title,artist_display,date_display,image_id,dimensions,description";
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/?page=${page}&fields=${fields}&limit=${15}`
        );
        const json = await response.json();
        setData(data ? data.concat(json.data) : json.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item data={item} favourites={favourites} />}
        ItemSeparatorComponent={() => <View style={styles.padding} />}
        ListHeaderComponent={() => <View style={styles.padding} />}
        ListFooterComponent={() => <View style={styles.padding} />}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        onEndReached={() => setPage(page + 1)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  flatlist: { flex: 1, paddingHorizontal: 12 },
  padding: { height: 8, flex: 1 },
});

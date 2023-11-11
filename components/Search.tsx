import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

type ArtworkData = Array<{
  _score: string;
  id: string;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string;
  dimensions: string;
  description: string;
}>;

export default function Search() {
  const [query, setQuery] = useState<string>();
  const [data, setData] = useState<ArtworkData>();

  useEffect(() => {
    (async () => {
      try {
        const fields =
          "id,title,artist_display,date_display,image_id,dimensions,description";
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=${fields}`
        );
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <View>
      <TextInput
        value={query}
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.nativeEvent.text);
        }}
        style={{ width: 320, height: 40, backgroundColor: "green" }}
      />
      {data?.map((art, i) => {
        return (
          <View key={i}>
            <Text>{art.title}</Text>
          </View>
        );
      })}
    </View>
  );
}

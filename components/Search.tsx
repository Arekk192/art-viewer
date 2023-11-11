import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

type ArtworkData = Array<{
  title: string;
  //   artist: string;
  //   artistID: string;
  //   imageID: string;
  //   dimensions: string;
  //   description: string;
}>;

export default function Search() {
  const [query, setQuery] = useState<string>();
  const [data, setData] = useState<ArtworkData>();

  useEffect(() => {
    (async () => {
      try {
        const fields = "title"; //  "id,title,artist_display,date_display,main_reference_number,image_id,dimensions,description";
        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=${fields}`
        );
        const json = await res.json();
        setData(json.data);
        // for (let i = 0; i < json["data"].length; i++) {
        //   console.log(json["data"][i]);
        // }
        console.log(data);
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

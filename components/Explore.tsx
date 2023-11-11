import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

type ArtworkData = Array<{
  id: string;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string;
  dimensions: string;
  description: string;
}>;

export default function Explore() {
  const [data, setData] = useState<ArtworkData>();

  useEffect(() => {
    (async () => {
      try {
        const fields =
          "id,title,artist_display,date_display,image_id,dimensions,description";
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/?fields=${fields}&limit=5`
        );
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {data?.map((art, i) => {
        return (
          <View
            key={i}
            style={{
              width: 320,
              height: 80,
              backgroundColor: "green",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: `https://www.artic.edu/iiif/2/${art.image_id}/full/600,/0/default.jpg`,
              }}
              resizeMode="contain"
              style={{ width: 72, height: 72 }}
            />
            <Text>{art.title}</Text>
          </View>
        );
      })}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

type ArtworkData = Array<{
  title: string;
  artist: string;
  artistID: string;
  imageID: string;
  dimensions: string;
  description: string;
}>;

export default function Explore() {
  const [data, setData] = useState<ArtworkData>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.artic.edu/api/v1/artworks/129884?fields=id,title,artist_display,date_display,main_reference_number,image_id"
        );
        const json = await response.json();
        setData([
          {
            artist: "artist",
            artistID: json["data"]["artist_display"].split("\n")[0],
            title: json["data"]["title"],
            imageID: json["data"]["image_id"],
            dimensions: json["data"]["dimensions"],
            description: json["data"]["description"],
          },
        ]);
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
                uri: `https://www.artic.edu/iiif/2/${art.imageID}/full/600,/0/default.jpg`,
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

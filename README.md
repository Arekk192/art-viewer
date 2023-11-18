# art-viewer

App for viewing works of art from Art Institude of Chicago. <br />
Art Institude of Chicago API Documentation: \
<a href="https://api.artic.edu/docs/">https://api.artic.edu/docs/</a><br /><br />

## Installation

Clone github repository and install required dependencies

```
git clone https://github.com/Arekk192/art-viewer
cd art-wiever
npm i
```

type to start app on android

```
npm run android
```

<br />

## Usage

App is divided to 3 main screens: Explore, Search and Favourite.
There are displayed artworks in every of them.
If you want to get some informations, such as dimensions, description, current location, etc., you can click it - this action will navigate you to Artwork screen.
Every artwork has add to favourites button which allows user to save artwork data locally in AsyncStorage.
Code for this component is located in `./src/screens/components/Item.tsx`

### Explore

Here you can scroll and explore new artworks.

### Search

Screen similar to Explore, but with TextInput allowing you to look for any artwork knowing its title or author.

### Favourite

FlatList with favourites artworks. They are stored locally in AsyncStorage

### Artwork

Screen with artwork data displayed:

- title
- date
- author
- description
- dimensions
- location (map) <br />

Sometimes artwork data (for example description) don't exist

### Author

Here you can read details about author including:

- author name
- years of life
- description
- list of artworks

<br />

## APIs

- "@openspacelabs/react-native-zoomable-view": "^2.1.5",
- "@react-native-async-storage/async-storage": "1.18.2",
- "@react-navigation/bottom-tabs": "^6.5.11",
- "@react-navigation/native": "^6.1.9",
- "expo": "~49.0.15",
- "expo-font": "~11.4.0",
- "expo-navigation-bar": "~2.3.0",
- "expo-splash-screen": "~0.20.5",
- "expo-status-bar": "~1.6.0",
- "react": "18.2.0",
- "react-native": "0.72.6",
- "react-native-maps": "1.7.1",
- "react-native-render-html": "^6.3.4",
- "react-native-svg": "13.9.0"

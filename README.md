# INSTALLATION

## Créer un nouveau projet
    npx create-expo-app nomDuProjet --template  

## Run le projet expo en local
    npx expo start

## screenshots de l'application :
splash screen
![Screenshot_splashScreen](https://github.com/Boubacarkonate/weCare-project/assets/122236288/9c2cf0ea-346c-4a1e-9275-c52f69d38c4e)


page d'inscription
![Screenshot_register](https://github.com/Boubacarkonate/weCare-project/assets/122236288/b5795517-74c2-4340-bed2-1adef52502fd)


page de connexion
![Screenshot_login](https://github.com/Boubacarkonate/weCare-project/assets/122236288/cca1de79-797c-4fde-a7bc-b6b6d7ccfc7c)


page profil
![Screenshot_profile](https://github.com/Boubacarkonate/weCare-project/assets/122236288/c0aa86a8-0a37-4ea4-ac6b-307d552f7998)


messagerie privée
![Screenshot_chat](https://github.com/Boubacarkonate/weCare-project/assets/122236288/6c2e84a4-8c14-479e-8b6b-cc4e580b04ad)


calendrier partargé
![Screenshot_calendar](https://github.com/Boubacarkonate/weCare-project/assets/122236288/2f571d9c-0d98-4c71-9304-fc5aa8a4867d)


album photo partagé
![Screenshot_album](https://github.com/Boubacarkonate/weCare-project/assets/122236288/1dd5602c-7f4f-4bba-a3f2-dd91412f2de3)

## Dépendances

### projet en local sur le web
    npx expo install react-dom react-native-web @expo/metro-runtime 

### création d'un web-build pour déployer en sur le web en gardant le même code source que pour les mobiles (netifily)
    npm install --save-dev @expo/webpack-config
    npx expo export:web 

### import firebase
    npm i firebase 

### import du async storage
    npm install axios @react-native-async-storage/async-storage
    
    import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage

### import de regex
    npm install escape-string-regexp

### importt hâchage password
    npm install bcryptjs

### checkbox expo
    npx expo install expo-checkbox

### import des navigations
    npx expo install @react-navigation/native 
    npx expo install @react-navigation/native-stack
    npx expo install react-native-screens react-native-safe-area-context

### import de l'interface chat
    npx expo install react-native-gifted-chat

### imort expo camera / image picker / document picker
    npm install expo-camera
    npm install expo-document-picker
    npm install expo-image-picker

### import des icônes 
    npm i @expo/vector-icons

### import de calendars
    npm install react-native-calendars

### import d'une bibliothèque interface utilisateur 
    npm install react-native-elements

### import de modal
    npm install react-native-modal

### import du webrtc
    npm install react-native-webrtc
    npm install @config-plugins/react-native-webrtc

### import de l'api agora
    npm install react-native-agora
    npm install agora-rn-uikit
    npm install agora-react-native-rtm


### import des tests
#### jest
    npx expo install jest-expo jest
    npm install --save-dev @types/jest     

    configurations "package.json" :

    "scripts": {
        ... 
        "test": "jest"
        },


    "jest": {
    "preset": "jest-expo",
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|firebase)"
    ]
    },

    npm test (pour exécuter les tests)

#### testing-library/react-native 
     npm install --save-dev @testing-library/react-native 

        import '@testing-library/jest-native/extend-expect';
        import { render, fireEvent, waitFor } from '@testing-library/react-native';

#### ESLint 
    npm install --save-dev eslint-plugin-react eslint-plugin-react-native

    Configuration du fichier .eslintrc.js

    npx eslint    "nom du fichier" (pour exécuter les tests sur le projet)

       



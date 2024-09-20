# INSTALLATION

## Créer un nouveau projet
    npx create-expo-app nomDuProjet --template  

## Run le projet expo en local
    npx expo start

## screenshots de l'application :
splash screen
![Capture d’écran (769)_292x640](https://github.com/user-attachments/assets/c57e319f-d395-4fc5-9f04-1fe2e0deffcf)



page d'inscription
![Capture d’écran (770)_297x640](https://github.com/user-attachments/assets/8a621362-61b6-4f12-96e2-539daf578f72)



page de connexion
![Capture d’écran (771)_297x640](https://github.com/user-attachments/assets/6796c49f-beda-476d-8218-76d29a9b9d67)



page profil
![Capture d’écran (772)_295x640](https://github.com/user-attachments/assets/5c26e756-14c2-4e95-912d-7bd7b7393816)



messagerie privée
![Capture d’écran (773)_293x640](https://github.com/user-attachments/assets/18f36ccf-fdf7-4bea-9f26-b458e6644bca)



calendrier partargé
![Capture d’écran (774)_292x640](https://github.com/user-attachments/assets/39d9337d-5320-4c9c-8375-4a7642a13315)



album photo partagé
![Capture d’écran (775)_292x640](https://github.com/user-attachments/assets/c85352db-3e4d-4350-9625-4426c95a4ddb)


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

       



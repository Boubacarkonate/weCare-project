import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Login from './src/view/auth/Login';
import ForgotPassword from './src/view/auth/ForgotPassword';
import Home from './src/view/Home';
import { Ionicons } from '@expo/vector-icons';
import Chat from './src/view/Chat';
import Register from './src/view/auth/Register';
import GroupChat from './src/view/GroupChat';
import GroupChatScreen from './src/view/GroupChatScreen';
import Profile from './src/view/Profile/Profile';
import HomeUser from './src/view/HomeUser';
import UpdateProfile from './src/view/Profile/UpdateProfile';
import DeleteProfile from './src/view/Profile/DeleteProfile';
import Album from './src/view/Album';
import CalendarEventViewAdmin from './src/view/CalendarEventAdmin';
import CalendarEventViewUser from './src/view/CalendarEventUser';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 70, height: 77, margin: 20 }}
      source={require('./assets/splashScreen.png')}
    />
  );
}


export default function App() {
  return (
    <View style={styles.container}>
   <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: '#38b6ff',
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
      />
        <Stack.Screen name="Register" component={Register} 
          options={{
            headerStyle: {
              backgroundColor: '#38b6ff',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
<Stack.Screen name="ForgotPassword" component={ForgotPassword}
options={{
    headerStyle: {
      backgroundColor: '#38b6ff',
    },
  }} 
/>
<Stack.Screen name="Profile" component={Profile}
  options={{
    headerStyle: {
      backgroundColor: '#38b6ff',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  }} 
/>
<Stack.Screen name="HomeUser" component={HomeUser} />
<Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({
            // headerBackVisible: false,
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: route.params.avatar }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16, color: '#fff' }}>
                  {route.params.name}
                </Text>
              </View>
            ),
            // headerTitleAlign: "left",
            // headerTitleStyle: { fontWeight: "bold" },
            headerStyle: {
              backgroundColor: '#38b6ff',
            }
          }
        )}
        />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} 
          options={{
            headerStyle: {
              backgroundColor: '#38b6ff',
            },
          }}
        />
        <Stack.Screen name="DeleteProfile" component={DeleteProfile} 
          options={{
            headerStyle: {
              backgroundColor: '#38b6ff',
            },
          }}
        />
        <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
        <Stack.Screen 
  name="Album" 
  component={Album} 
  options={{
    headerStyle: {
      backgroundColor: '#38b6ff',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  }} 
/>
        <Stack.Screen name="CalendarEventAdmin" component={CalendarEventViewAdmin} 
          options={{
            headerStyle: {
              backgroundColor: '#38b6ff',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }} 
        />
        <Stack.Screen name="CalendarEventUser" component={CalendarEventViewUser} 
          options={{
            headerStyle: {
              backgroundColor: '#38b6ff',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }} 
        />
        <Stack.Screen name="GroupChat" component={GroupChat} 
          options={{
            headerStyle: {
              backgroundColor: '#38b6ff',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
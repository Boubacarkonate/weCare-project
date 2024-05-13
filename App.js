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
import Calendar from './src/view/Calendar';
import ClassRegisterView from './src/view/ClassRegisterView';
import UpdateProfile from './src/view/Profile/UpdateProfile';
import DeleteProfile from './src/view/Profile/DeleteProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 70, height: 77, margin: 20 }}
      source={require('./assets/WeCare.png')}
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
        <Stack.Screen name="Register" component={Register} />
<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
<Stack.Screen name="Profile" component={Profile}
  options={{
          headerStyle: {
            backgroundColor: '#38b6ff',
          },
        }}
/>
<Stack.Screen name="HomeUser" component={HomeUser} />
<Stack.Screen
          name="Home"
          component={Home}
          // options={{
          //   headerBackVisible: false,
          //   title: "Active users",
          //   headerTitleAlign: "center",
          //   headerTitleStyle: { fontWeight: 900 },
          //   headerRight: () => (
          //     <TouchableOpacity onPress={() => alert('This is a button!')} style={styles.headerRightBtn}>
          //       <Ionicons name="search" size={30} color="black" style={{ paddingRight:20 }} />
          //       <Ionicons name="ellipsis-vertical" size={30} color="black"/>
          //     </TouchableOpacity>
          //   ),
          // }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({
            headerBackVisible: false,
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
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {route.params.name}
                </Text>
              </View>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: { fontWeight: "bold" },
          })}
        />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="DeleteProfile" component={DeleteProfile} />
        <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
      </Stack.Navigator>
    </NavigationContainer> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
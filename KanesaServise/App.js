import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/Views/HomeScreen';
import PesananScreen from './src/Views/PesananScreen';
import ProfileScreen from './src/Views/ProfileScreen';
import SignInScreen from './src/Views/SignInScreen';
import SignUpScreen from './src/Views/SignUpScreen';
import css from './src/Assets/style';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerStyle: css.headStyle,
      })}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={() => ({headerTransparent: true, title: ''})}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={() => ({title: 'Sign Up'})}
      />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'md-home';
          } else if (route.name === 'Pesanan') {
            iconName = focused ? 'ios-basket' : 'md-basket';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'ios-person' : 'md-person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#eaeeea',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pesanan" component={PesananScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [login, setLogin] = useState(false);
  return (
    <NavigationContainer>{login ? <Home /> : <Auth />}</NavigationContainer>
  );
}

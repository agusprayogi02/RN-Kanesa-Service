import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/Views/HomeScreen';
import PesananScreen from './src/Views/PesananScreen';
import ProfileScreen from './src/Views/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

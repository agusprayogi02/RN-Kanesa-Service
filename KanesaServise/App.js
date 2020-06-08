import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
import {postLogin} from './src/Components/Api';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthContext = React.createContext();

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

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {}
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        postLogin('api/login', data).then((data) => {
          dispatch({type: 'SIGN_IN', token: data[0]});
        });
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.userToken == null ? (
            <Stack.Screen name="Auth" component={Auth} />
          ) : (
            <Stack.Screen name="Utama" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

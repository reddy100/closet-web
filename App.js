import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ClosetGridScreen from './src/screens/ClosetGridScreen';
import BagCreateScreen from './src/screens/BagCreateScreen';
import ClosetScreen from './src/screens/ClosetScreen';
import OutfitCreateScreen from './src/screens/OutfitCreateScreen';
import OutfitListScreen from './src/screens/OutfitListScreen';
import TripCreateScreen from './src/screens/TripCreateScreen';
import TripListScreen from './src/screens/TripListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import AccountScreen from './src/screens/AccountScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as ClothesProvider} from './src/context/ClothesContext';
import {Provider as OutfitsProvider} from './src/context/OutfitsContext';
import {Provider as TripsProvider} from './src/context/TripsContext';
import {setNavigator} from './src/navigationRef';

const loginFlow = createStackNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen
})

const closetFlow = createStackNavigator({
  Closet: ClosetScreen,
  ClosetGridScreen: {
      screen: ClosetGridScreen,
      navigationOptions: {
        tabBarVisible: false,
      }
  }
},{
  navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'Closet',
    tabBarVisible: getActiveRoute(navigation.state) !== 'ClosetGridScreen'
  })
});

const outfitFlow = createStackNavigator({
  OutfitList: OutfitListScreen,
  OutfitCreate: OutfitCreateScreen
},{
  navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'Outfits',
    tabBarVisible: getActiveRoute(navigation.state) !== 'OutfitCreate'
  })
});

const tripFlow = createStackNavigator({
  TripList: TripListScreen,
  TripCreate: TripCreateScreen,
  BagCreate: BagCreateScreen
},{
  navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'Trips',
    tabBarVisible: !(getActiveRoute(navigation.state) in ['TripCreateScreen', 'BagCreateScreen'])
  })
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow,
  mainFlow: createBottomTabNavigator({
      closetFlow,
      outfitFlow,
      tripFlow,
      Account: createStackNavigator({AccountScreen}),
  })
});
const getActiveRoute = route => {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
      return route.routeName;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRoute(childActiveRoute);
}
const App =  createAppContainer(switchNavigator);

export default () => {
    return (
        <AuthProvider>
          <TripsProvider>
            <OutfitsProvider>
              <ClothesProvider>
                <App ref = {(switchNavigator) => {setNavigator(switchNavigator)}}/>
              </ClothesProvider>
            </OutfitsProvider>
          </TripsProvider>
        </AuthProvider>
    )
}
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context'imiz
import { FavoritesProvider } from './src/context/FavoritesContext';

// Sayfalarımız
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Ana Sayfa Yığını
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// 2. Favoriler Yığını
function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// 3. YENİ: Harita Yığını (Kırmızı ekran hatasını çözen kısım!)
function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapMain" component={MapScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#FF6B6B',
    tabBarInactiveTintColor: '#A0AEC0',
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      height: 85,          // Menüyü biraz daha uzun yaptık
      paddingBottom: 25,   // Alttan bırakılan boşluğu artırdık (telefon çubuğuna çarpmaz)
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#EDF2F7',
      elevation: 0,
      shadowOpacity: 0,
    },
  }}
>
          <Tab.Screen 
            name="Ana Sayfa" 
            component={HomeStack} 
            options={{ tabBarIcon: () => <Text style={{fontSize: 20}}>🏠</Text> }}
          />
          <Tab.Screen 
            name="Harita" 
            component={MapStack} // BURASI GÜNCELLENDİ (MapScreen yerine MapStack oldu)
            options={{ tabBarIcon: () => <Text style={{fontSize: 20}}>🗺️</Text> }}
          />
          <Tab.Screen 
            name="Favoriler" 
            component={FavoritesStack} 
            options={{ tabBarIcon: () => <Text style={{fontSize: 20}}>❤️</Text> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
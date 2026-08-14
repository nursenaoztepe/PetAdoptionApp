import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { petsData } from '../data/pets';

// navigation prop'unu ekledik
export default function MapScreen({ navigation }) {
  
  const initialRegion = {
    latitude: 39.5, 
    longitude: 31.0, 
    latitudeDelta: 6.0, 
    longitudeDelta: 6.0,
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {petsData.map((pet) => (
          <Marker
            key={pet.id}
            coordinate={{
              latitude: pet.latitude,
              longitude: pet.longitude,
            }}
            pinColor={pet.type === 'Kedi' ? 'blue' : 'tomato'}
            // BURASI EKLENDİ: Balona tıklanınca Detaylar sayfasına gider
            onCalloutPress={() => navigation.navigate('Details', { pet: pet })}
          >
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Image 
                  source={{ uri: pet.image }} 
                  style={styles.calloutImage} 
                  resizeMode="cover"
                />
                <Text style={styles.calloutTitle}>{pet.name}</Text>
                <Text style={styles.calloutText}>{pet.type} - {pet.breed}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  calloutContainer: {
    backgroundColor: 'white', borderRadius: 12, padding: 10, width: 140, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
  },
  calloutImage: { width: 120, height: 90, borderRadius: 8, marginBottom: 8 },
  calloutTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 2, color: '#2D3748' },
  calloutText: { fontSize: 12, color: '#718096' }
});
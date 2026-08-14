import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

export default function DetailsScreen({ route, navigation }) {
  const { pet } = route.params;
  const { toggleFavorite, checkIsFavorite } = useContext(FavoritesContext);
  
  const isFav = checkIsFavorite(pet.id);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: pet.image }} style={styles.image} />
        
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.typeText}>{pet.type} - {pet.breed}</Text>
            </View>
            
            <TouchableOpacity onPress={() => toggleFavorite(pet)} style={styles.favoriteButton}>
              <Text style={styles.heartEmoji}>{isFav ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{pet.locationName}</Text>
          </View>

          <View style={styles.traitsContainer}>
            <View style={styles.traitCard}>
              <Text style={styles.traitLabel}>Yaş</Text>
              <Text style={styles.traitValue}>{pet.age || '1.5 Yaş'}</Text>
            </View>
            <View style={styles.traitCard}>
              <Text style={styles.traitLabel}>Cinsiyet</Text>
              <Text style={styles.traitValue}>{pet.gender || 'Erkek'}</Text>
            </View>
            <View style={styles.traitCard}>
              <Text style={styles.traitLabel}>Kilo</Text>
              <Text style={styles.traitValue}>{pet.weight || '4.2 kg'}</Text>
            </View>
          </View>

          <Text style={styles.aboutTitle}>Hakkında</Text>
          <Text style={styles.aboutText}>{pet.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.adoptLargeButton} 
          activeOpacity={0.8}
          onPress={() => alert(`${pet.name} için sahiplenme talebi alındı! 🐾`)}
        >
          <Text style={styles.adoptLargeButtonText}>Hemen Sahiplen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  contentContainer: { padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 28, fontWeight: '800', color: '#2D3748' },
  typeText: { fontSize: 16, color: '#718096', marginTop: 4 },
  favoriteButton: { padding: 5 },
  heartEmoji: { fontSize: 32 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  locationIcon: { fontSize: 18, marginRight: 5 },
  locationText: { fontSize: 15, color: '#4A5568', fontWeight: '500' },
  traitsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  traitCard: { backgroundColor: '#F7F9FC', padding: 15, borderRadius: 15, alignItems: 'center', width: '30%' },
  traitLabel: { fontSize: 12, color: '#A0AEC0', marginBottom: 4, fontWeight: '600' },
  traitValue: { fontSize: 15, color: '#2D3748', fontWeight: 'bold' },
  aboutTitle: { fontSize: 20, fontWeight: '700', color: '#2D3748', marginBottom: 10 },
  aboutText: { fontSize: 15, color: '#718096', lineHeight: 24 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EDF2F7' },
  adoptLargeButton: { backgroundColor: '#FF6B6B', paddingVertical: 16, borderRadius: 25, alignItems: 'center', elevation: 5 },
  adoptLargeButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
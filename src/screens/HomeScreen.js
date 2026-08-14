import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { petsData } from '../data/pets';
import { calculateDistance } from '../utils/distance';

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('Tümü'); // 'Tümü', 'Kedi', 'Köpek'
  const [showOnlyNearby, setShowOnlyNearby] = useState(false); // Yakındakiler filtresi
  const [searchQuery, setSearchQuery] = useState(''); // Arama Çubuğu State'i
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Kullanıcının GPS konumunu alıyoruz
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setUserLocation({ latitude: 41.2045, longitude: 32.6570 }); // Karabük Merkez varsayılan
          setLoadingLocation(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setUserLocation({ latitude: 41.2045, longitude: 32.6570 });
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  // Filtreleme, Arama ve 50 km Sınırı Mantığı
  const filteredPets = (() => {
    let result = petsData;

    // 1. Arama Çubuğuna Göre Filtrele (İsim veya Cins)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(query) || 
        pet.breed.toLowerCase().includes(query)
      );
    }

    // 2. Kategoriye Göre Filtrele (Tümü, Kedi, Köpek)
    if (activeCategory !== 'Tümü') {
      result = result.filter(pet => pet.type === activeCategory);
    }

    // 3. Eğer "Yakındakiler" aktifse, sadece 50 km ve altındakileri filtrele ve mesafeye göre sırala
    if (showOnlyNearby && userLocation) {
      result = result
        .map(pet => {
          const distance = calculateDistance(userLocation.latitude, userLocation.longitude, pet.latitude, pet.longitude);
          return { ...pet, distance };
        })
        .filter(pet => pet.distance <= 50)
        .sort((a, b) => a.distance - b.distance);
    }

    return result;
  })();

  const CategoryButton = ({ title }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton, 
        activeCategory === title && styles.categoryButtonActive
      ]}
      onPress={() => setActiveCategory(title)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.categoryButtonText,
        activeCategory === title && styles.categoryButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Merhaba Nur Sena 👋</Text>
        <Text style={styles.title}>Yeni bir dost edin</Text>
      </View>

      {/* MODERN ARAMA ÇUBUĞU */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="İsim veya cins ara (Örn: Golden, Tekir)..."
          placeholderTextColor="#A0AEC0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ORTALANMIŞ FİLTRE ALANI */}
      <View style={styles.filterContainer}>
        <View style={styles.categoriesRow}>
          <CategoryButton title="Tümü" />
          <CategoryButton title="Kedi" />
          <CategoryButton title="Köpek" />
        </View>

        <TouchableOpacity 
          style={[styles.nearbyButton, showOnlyNearby && styles.nearbyButtonActive]}
          onPress={() => setShowOnlyNearby(!showOnlyNearby)}
          activeOpacity={0.7}
        >
          <Text style={styles.nearbyIcon}>📍</Text>
          <Text style={[styles.nearbyText, showOnlyNearby && styles.nearbyTextActive]}>Yakındakiler (50 km)</Text>
        </TouchableOpacity>
      </View>
      
      {loadingLocation ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loaderText}>Konumunuz alınıyor...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          // BOŞ DURUM (EMPTY STATE) İLLÜSTRASYONU VE YÖNLENDİRİCİSİ
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyEmoji}>😿</Text>
              <Text style={styles.emptyTitle}>Aradığınız kriterde dost bulamadık</Text>
              <Text style={styles.emptyText}>Farklı bir arama yapabilir veya filtreleri temizleyebilirsiniz.</Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => { setSearchQuery(''); setActiveCategory('Tümü'); setShowOnlyNearby(false); }}
              >
                <Text style={styles.resetButtonText}>Filtreleri Temizle</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => {
            const distance = userLocation ? calculateDistance(
              userLocation.latitude, 
              userLocation.longitude, 
              item.latitude, 
              item.longitude
            ).toFixed(1) : '0.0';

            return (
              <View style={styles.card}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                  <View style={[styles.image, styles.noImageContainer]}>
                    <Text style={styles.noImageEmoji}>🐾</Text>
                    <Text style={styles.noImageText}>Fotoğraf bulunamadı 🥺</Text>
                  </View>
                )}
                
                <View style={styles.infoContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={[styles.badge, item.type === 'Kedi' ? styles.badgeCat : styles.badgeDog]}>
                      <Text style={styles.badgeText}>{item.type}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.breedText}>{item.breed}</Text>
                  
                  <View style={styles.footerRow}>
                    <View style={styles.locationContainer}>
                      <Text style={styles.locationIcon}>📍</Text>
                      <Text style={styles.locationText}>{item.locationName} ({distance} km)</Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.adoptButton} 
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('Details', { pet: item })}
                    >
                      <Text style={styles.adoptButtonText}>Detaylar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC', paddingTop: 60 },
  headerContainer: { paddingHorizontal: 20, marginBottom: 12 },
  greeting: { fontSize: 16, color: '#666', marginBottom: 2 },
  title: { fontSize: 26, fontWeight: '800', color: '#2D3748' },

  // Arama Çubuğu Stilleri
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#2D3748' },
  clearIcon: { fontSize: 16, color: '#A0AEC0', paddingLeft: 5 },

  // Ortalanmış Filtre Alanı
  filterContainer: { paddingHorizontal: 20, marginBottom: 15, alignItems: 'center' },
  categoriesRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 8 },
  categoryButton: { paddingVertical: 6, paddingHorizontal: 14, backgroundColor: '#EDF2F7', borderRadius: 20 },
  categoryButtonActive: { backgroundColor: '#FF6B6B' },
  categoryButtonText: { color: '#4A5568', fontWeight: '600', fontSize: 13 },
  categoryButtonTextActive: { color: '#FFFFFF' },

  // Yakındakiler Butonu
  nearbyButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDF2F7', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, gap: 5 },
  nearbyButtonActive: { backgroundColor: '#2B6CB0' },
  nearbyIcon: { fontSize: 13 },
  nearbyText: { color: '#4A5568', fontWeight: '600', fontSize: 13 },
  nearbyTextActive: { color: '#FFFFFF' },

  // Boş Durum (Empty State) Stilleri
  emptyStateContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  emptyEmoji: { fontSize: 50, marginBottom: 10 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 6 },
  emptyText: { fontSize: 14, color: '#718096', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  resetButton: { backgroundColor: '#FF6B6B', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  resetButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },

  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 10, color: '#718096', fontSize: 14 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', marginBottom: 25, borderRadius: 20, elevation: 6, shadowColor: '#1A202C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  image: { width: '100%', height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20, resizeMode: 'cover' },
  noImageContainer: { backgroundColor: '#EDF2F7', justifyContent: 'center', alignItems: 'center' },
  noImageEmoji: { fontSize: 40, marginBottom: 8 },
  noImageText: { color: '#A0AEC0', fontSize: 14, fontWeight: '600', textAlign: 'center', paddingHorizontal: 10 },
  infoContainer: { padding: 16 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 22, fontWeight: '700', color: '#1A202C' },
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  badgeCat: { backgroundColor: '#EBF8FF' },
  badgeDog: { backgroundColor: '#FEFCBF' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#4A5568' },
  breedText: { fontSize: 15, color: '#718096', marginBottom: 16 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EDF2F7', paddingTop: 16 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  locationIcon: { fontSize: 16, marginRight: 4 },
  locationText: { fontSize: 13, color: '#4A5568', fontWeight: '500', flexShrink: 1 },
  adoptButton: { backgroundColor: '#FF6B6B', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  adoptButtonText: { color: '#FFF', fontWeight: '600', fontSize: 14 }
});
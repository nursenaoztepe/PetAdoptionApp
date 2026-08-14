# 🐾 Pet Adoption App (Yuva Bul)

Bu proje, kullanıcıların çevrelerindeki sevimli dostları (kedi ve köpek) keşfetmesini, konum bazlı mesafelerini görmesini ve sahiplenme süreci için detaylı bilgi almasını sağlayan modern bir **React Native** mobil uygulamasıdır.

## 🚀 Öne Çıkan Özellikler

*   **Canlı Konum ve Mesafe Hesabı:** `expo-location` entegrasyonu ile kullanıcının gerçek GPS konumu alınır ve Haversine formülü kullanılarak her bir patili dostun kullanıcılara olan mesafesi kilometre cinsinden anlık hesaplanır.
*   **Akıllı Filtreleme ve Yakındakiler:** 
    *   Tümü, Kedi ve Köpek kategorileri.
    *   **"Yakındakiler (50 km)"** filtresi ile sadece 50 kilometre yarıçapındaki dostları listeleme ve en yakın olandan en uzağa akıllı sıralama.
*   **Hızlı Arama Çubuğu:** İsim veya cins bazlı anlık filtreleme (Örn: *Golden*, *Tekir*).
*   **Favoriler Sistemi (Context API):** Beğenilen dostların favorilere eklenip tüm ekranlar arasında senkronize edilmesi.
*   **İnteraktif Harita & Detay Ekranları:** Hayvanların harita üzerindeki konumlarını görme ve detay sayfalarında yaş, cinsiyet, kilo gibi detaylı bilgilere erişim.
*   **Modern Arayüz (UI/UX):** Şık kart yapıları, rozetler ve boş durum (empty state) illüstrasyonları ile optimize edilmiş kullanıcı deneyimi.

## 🛠️ Kullanılan Teknolojiler

*   **React Native** (Mobil Uygulama Çatı Mimarisi)
*   **Expo** (Geliştirme ve Çalıştırma Ortamı)
*   **React Navigation** (Bottom Tabs & Native Stack Navigasyon)
*   **React Context API** (Global State Yönetimi)
*   **Expo Location** (GPS Konum Servisleri)

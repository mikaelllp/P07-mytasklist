## 👤 Identitas Mahasiswa

| Field | Isi |
|-------|-----|
| **Nama** | Mikael Putra Manullang |
| **NIM** | 243303621262 |

---

## 📱 Deskripsi Aplikasi

Aplikasi MyTaskList adalah aplikasi manajemen tugas berbasis React Native yang memungkinkan pengguna menambahkan, mengedit, menghapus, dan menandai tugas sebagai selesai. Setiap task dapat diberi prioritas (Tinggi, Sedang, Rendah) serta ditampilkan dengan filter berdasarkan status (Semua, Aktif, Selesai). Aplikasi ini juga dilengkapi progress tracking dan UI modern yang responsif untuk meningkatkan pengalaman pengguna.

---

## ✅ Fitur yang Diimplementasikan

### Fitur Wajib
- [x] **Setup & Running di HP Fisik** — Project dibuat dengan `npx create-expo-app`, dapat dijalankan via Expo Go (QR Code)
- [x] **Komponen Dasar (P02 & P03)** — Menggunakan `View`, `Text`, `TouchableOpacity`, `SafeAreaView`; layout dengan `StyleSheet.create` + Flexbox
- [x] **State Management dengan useState (P04)** — Minimal 2 state (`inputText`, `tasks`), conditional rendering (empty state, progress bar, error message, badge prioritas)
- [x] **Form Input dengan Validasi (P05)** — `TextInput` + `KeyboardAvoidingView`; validasi: tidak boleh kosong & minimal 3 karakter; pesan error inline + `Alert` konfirmasi hapus
- [x] **FlatList Dinamis (P06)** — `FlatList` dengan `keyExtractor` valid, `ListEmptyComponent` dengan tampilan informatif per-filter
- [x] **CRUD Minimal** — Add (tambah task baru) dan Delete (hapus dengan konfirmasi Alert)

### Fitur Bonus
- [x] ⭐ **Mark as Done (+5)** — Centang task yang sudah selesai; tampilan task berubah (strikethrough + opacity)
- [x] ⭐ **Prioritas Task (+5)** — Tiga level: Tinggi / Sedang / Rendah, masing-masing dengan warna aksen dan badge berbeda
- [x] ⭐ **Deploy ke Expo Snack (+10)** — Project dapat langsung di akses dan di demo
- [x] ⭐ **Counter (+5)** — "X / Y selesai" ditampilkan di header dalam komponen counter box
- [x] ⭐ **Filter View (+5)** — Tab filter: Semua / Aktif / Selesai, dengan `ListEmptyComponent` kontekstual per-filter
- [x] ⭐ **UI Profesional (+10)** — Dark mode konsisten, garis aksen prioritas, progress bar dinamis, chip prioritas interaktif, animasi opacity task selesai


---

## 📸 Screenshot

| List Kosong (Empty State) | Ada Task & Prioritas | Task Selesai + Counter |
|:-:|:-:|:-:|
| ![alt text](<C:\Users\hpsn\OneDrive\Desktop\mytasklist - p7\P07-mytasklist\image.png>)| ![alt text](<![alt text](image-1.png)C:\Users\hpsn\OneDrive\Desktop\mytasklist - p7\P07-mytasklist\image copy.png>)| ![alt text](<C:\Users\hpsn\OneDrive\Desktop\mytasklist - p7\P07-mytasklist\image-1.png>)|

---

## 🚀 Cara Menjalankan Project

### Prasyarat
- Node.js (v18 atau lebih baru)
- Expo CLI
- Aplikasi **Expo Go** terinstall di HP

### Langkah-langkah

```bash
# 1. Clone repository
git clone 
cd MyTaskList-App

# 2. Install dependencies
npm install

# 3. Jalankan development server
npx expo start

# 4. Scan QR Code dengan Expo Go (Android) atau Kamera (iOS)
```
---
## 🔗 Demo
[Cek di Expo Snack](https://snack.expo.dev/@mikaelll/p07-mytasklist)

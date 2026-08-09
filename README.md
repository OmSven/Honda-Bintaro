# Website Sales Mobil Honda & CMS Admin Dashboard Serverless v0.1.0

Website penjualan sales mobil Honda modern, cepat, dan berkonversi tinggi yang dilengkapi dengan **CMS Admin Dashboard Serverless** terintegrasi GitHub REST API. Website ini dirancang khusus untuk mempermudah sales counter, dealer, atau digital marketer dalam mengelola katalog produk, harga OTR, promo, e-brosur, halaman kustom, dan SEO secara mandiri tanpa memerlukan server backend berbayar.

---

## 🚀 Fitur Utama Website (Frontend)

### 1. Desain Modern & High Performance
* **Aksen Glassmorphism & Responsif Penuh:** Tampilan elegan dan responsif di semua perangkat (Desktop, Tablet, dan Mobile).
* **Mode Terang & Gelap:** Mendukung preferensi tampilan pengguna dengan tingkat kontras yang optimal.
* **Preloader Animasi:** Animasi pemuatan layar pembuka yang dapat diaktifkan/dinonaktifkan serta logo yang dapat disesuaikan.

### 2. Katalog Produk & Halaman Detail Interaktif (`/model/?id=...`)
* **Grid Lineup Kategori:** Menampilkan mobil berdasarkan kategori (SUV, MPV, Sedan, City Car & Hatchback).
* **Detail Model Komprehensif:** Galeri foto beresolusi tinggi, pilihan warna mobil, daftar varian & harga OTR, tabel spesifikasi teknis lengkap dalam bentuk akordeon, serta simulasi persyaratan kredit.
* **Status Lencana Khusus:** Dukungan lencana promosi seperti "New" (oranye) dan "All New" (merah menyala).

### 3. Halaman Daftar Harga OTR (`/pricelist/`)
* **Tabel Harga Terstruktur:** Rincian harga OTR seluruh varian mobil Honda, paket Essential (Paket Prima), dan paket Extra (Paket Prima+).
* **Tampilan Adaptif:** Tabel berjenjang (`rowspan`) pada desktop dan otomatis bertransformasi menjadi kartu ringkas di layar mobile.
* **Catatan Kaki Dinamis:** Informasi ketentuan harga OTR, BBN, dan area penjualan yang dapat diperbarui secara mandiri.

### 4. e-Brochure Hub & Google Drive PDF Viewer (`/brochure/`)
* **Penampil PDF Interaktif:** Pengunjung dapat membaca brosur PDF resmi langsung di dalam website melalui modal popup integrasi Google Drive tanpa perlu membuka tab baru.
* **Tombol Unduh Langsung:** Memungkinkan pengunjung mengunduh file brosur PDF asli ke perangkat mereka.

### 5. Landing Page Iklan Promo Google Ads (`/promo/`)
* **Fokus Konversi Tinggi:** Halaman landing khusus promosi minim distraksi navigasi.
* **Fitur Penunjang Iklan:** Countdown timer 24 jam (reset otomatis harian), indikator sisa kuota promo dinamis, poin keunggulan (USP), kartu promo unggulan, dan formulir konsultasi cepat terhubung ke WhatsApp.

### 6. Halaman Terima Kasih (`/thank-you/`)
* **Konversi Otomatis:** Halaman sasaran setelah pengisian formulir promo yang secara otomatis mengarahkan pengunjung ke chat WhatsApp sales counter.

### 7. Manajemen Halaman Kustom (`/page/?id=...`)
* **Fleksibilitas Artikel & Landing Page:** Kemampuan membuat halaman tak terbatas untuk artikel tips, berita, kebijakan privasi, syarat ketentuan pemesanan, dsb.

### 8. Tombol Pintas & Template Pesan WhatsApp
* **Template Pesan Spesifik:** Teks chat WhatsApp otomatis terformat rapi sesuai aksi pengunjung (Tanya Promo, Konsultasi Model Tertentu beserta varian dan harga OTR, Booking Test Drive, atau Unduh Brosur).

### 9. Keamanan & Peringatan Penipuan (Fraud Warning System)
* **Modal Transaksi Aman:** Ikon lonceng di header yang membuka peringatan resmi dealer untuk mengingatkan pelanggan agar hanya melakukan transfer ke rekening resmi dealer.

### 10. SEO Terintegrasi & Google XML Sitemap Otomatis
* **SEO Metadata Lengkap:** Pengaturan judul (*Meta Title*), deskripsi (*Meta Description*), kata kunci (*Keywords*), serta gambar thumbnail media sosial (*OG Image* WhatsApp/Facebook) untuk setiap halaman dan model mobil.
* **Google XML Sitemap Dinamis (`sitemap.xml` & `robots.txt`):** Peta situs berstandar protokol Google Search Console yang otomatis mencakup seluruh halaman dan produk baru.

---

## 💻 Fitur Dasbor Admin CMS Serverless (`/login/`)

Dasbor admin berjalan sepenuhnya di sisi peramban (*client-side serverless*) menggunakan integrasi **GitHub REST API**. Anda tidak membutuhkan server hosting bulanan seperti PHP/Node.js maupun database SQL untuk mengoperasikannya.

### 1. Keamanan & Autentikasi
* **Login Gate Terenkripsi SHA-256:** Keamanan akses dasbor dengan verifikasi hash kata sandi client-side.
* **Sistem Lisensi Domain:** Perlindungan domain website untuk kepemilikan lisensi resmi.

### 2. Pengaturan Web & Kustomisasi Tema
* **Profil & Identitas Sales:** Mengubah nama sales, nomor WhatsApp, email, foto profil, logo header, logo footer, dan logo animasi preloader layar.
* **Preset Warna Dealer:** Memilih palet warna bawaan (Honda Red, Modern Blue, Emerald Green, Sleek Dark, dsb.) atau warna kustom dengan pratinjau langsung.
* **Visual Menu Builder:** Mengatur navigasi header dengan visual list, drag & drop susunan menu, dropdown bertingkat, dan tombol WhatsApp CTA.
* **Pusat SEO & Google XML Sitemap:** Pratinjau tampilan cuplikan Google SERP secara *realtime* dan tombol 1-klik salin link `sitemap.xml` untuk Google Webmaster.
* **Informasi Rekening & Footer:** Mengatur alamat dealer, jam operasional, peta Google Maps, dan daftar rekening bank pembayaran resmi.

### 3. Manajemen Banner Slider
* **Multi-Device Banner:** Pengaturan banner terpisah untuk tampilan layar Desktop dan layar Mobile.
* **Pengurutan & Tautan:** Tambah/hapus banner, ubah urutan slide, isi teks alt, dan atur tautan tujuan promosi.

### 4. Manajemen Katalog Produk
* **Tambah & Hapus Mobil:** Menambah model mobil baru atau menghapus unit yang diskontinu.
* **Drag & Drop Urutan Mobil:** Mengubah peringkat prioritas tampil mobil di homepage dan menu navigasi.
* **Form Lengkap:** Mengatur nama, kategori tipe, harga awal, badge status ("New" / "All New"), galeri foto, pilihan warna, spesifikasi teknis mesin/dimensi, serta SEO per model.

### 5. Manajemen Halaman Kustom & Database Terpadu
* **Editor Halaman Sistem:** Mengedit konten dan metadata halaman `pricelist`, `brochure`, `promo`, dan `thank-you`.
* **Editor Tabel OTR (`pricelist.json`):** Menambah kategori mobil, varian, transmisi, harga OTR, paket Essential/Extra, dan catatan kaki secara visual.
* **Editor e-Brochure Google Drive:** Menautkan ID file Google Drive untuk setiap model mobil dengan tombol pintas *"Buka Google Drive"* dan panduan langkah berbagi link.
* **Rich Text CKEditor 5:** Penulisan isi halaman kustom baru dengan format visual kaya fitur (Heading, List, Link, Bold, Italic).
* **Alur Simpan Sementara & Commit Multi-File:** Fitur draft lokal (*Simpan Sementara*) dan pengunggahan otomatis (*Commit Perubahan*) ke seluruh file JSON terkait (`pages.json`, `pricelist.json`, `site_config.json`, dan `sitemap.xml`) dalam satu kali klik.

### 6. Pustaka Media (Media Library)
* **Unggah & Ganti Gambar Otomatis:** Mengunggah file gambar langsung ke folder repositori `assets/images/` dengan fitur penghapusan file lama otomatis saat diganti (*auto-replace*).
* **Manajemen Aset:** Menampilkan daftar gambar yang tersimpan, pratinjau ganda (*Before / After*), salin path relatif 1-klik, dan hapus gambar permanen.

---

## 🛠️ Riwayat Perubahan (Changelog)

### 📦 Catatan Rilis v0.1.0 (Initial Official Release)
*Rilis perdana resmi website sales mobil Honda modern dan CMS Admin Dashboard Serverless.*

#### ✨ Fitur Baru (New Features)
1. **Frontend Website Lengkap:**
   - Halaman Beranda interaktif dengan banner slider, lineup kategori, kartu promo, berita WP JSON API, dan modal peringatan transfer aman (*Fraud Warning*).
   - 11 Halaman detail model mobil Honda resmi (`/model/?id=...`) dengan spesifikasi akordeon lengkap dan simulasi kredit.
   - Halaman Daftar Harga OTR (`/pricelist/`) dengan layout adaptif desktop (tabel berjenjang) dan mobile (kartu ringkas).
   - Halaman e-Brochure Hub (`/brochure/`) dengan penampil PDF interaktif Google Drive modal dan opsi unduh langsung.
   - Landing Page Iklan Google Ads (`/promo/`) dengan countdown timer 24 jam dan form konsultasi cepat WhatsApp.
   - Halaman Terima Kasih (`/thank-you/`) sasaran konversi iklan dengan pemicu otomatis chat WhatsApp sales counter.
   - Sistem Halaman Kustom (`/page/?id=...`) untuk artikel berita dan halaman statis tanpa batas.
2. **CMS Admin Dashboard Serverless (`/login/`):**
   - Antarmuka manajemen website modern berbasis GitHub REST API tanpa server backend.
   - Login gate terenkripsi SHA-256 untuk keamanan akses dasbor.
   - Visual Menu Builder untuk navigasi header dengan dukungan link, dropdown bertingkat, dan WhatsApp CTA.
   - Customizer tema & palet warna dealer dengan live preview.
   - Manajemen Banner Slider terpisah untuk perangkat Desktop dan Mobile.
   - Manajemen Katalog Produk dengan urutan drag & drop dan badge status produk.
   - Manajemen Halaman Kustom terintegrasi dengan editor tabel OTR dan penaut e-brosur Google Drive.
   - Pustaka Media (*Media Library*) dengan upload, pratinjau ganda, dan penghapusan file otomatis.
   - Rich Text CKEditor 5 untuk penulisan konten halaman baru.
3. **Penyimpanan Terpadu & Alur Simpan Sementara:**
   - Tombol **Simpan Sementara** di semua form editor untuk menyimpan draf perubahan ke memori lokal.
   - Tombol **Commit Perubahan** yang otomatis mengunggah multi-file JSON terkait (`pages.json`, `pricelist.json`, `site_config.json`, dan `sitemap.xml`) secara beruntun dalam 1 kali prompt.
4. **Google XML Sitemap & SEO Otomatis:**
   - Pembuatan otomatis file `sitemap.xml` dan `robots.txt` berstandar Google Search Console.
   - Box Google XML Sitemap di subtab SEO Metadata dengan link langsung, tombol salin 1-klik, indikator total URL terindeks, dan panduan Google Webmaster.
5. **Sistem Lisensi Domain:**
   - Penguncian dan verifikasi lisensi domain resmi berbasis enkripsi hash SHA-256.

#### 🐛 Perbaikan Bug & Optimasi (Bug Fixes & Optimizations)
1. **Keterbacaan Teks Mode Terang (Light Mode):** Memperbaiki kontras seluruh teks, judul menu, lencana sistem, dan tabel di dasbor admin agar memiliki kontras tinggi yang tajam di mode terang.
2. **Penyeragaman Pratinjau Google SERP:** Merapikan tampilan kartu simulasi pencarian Google menjadi seragam, bersih (*clean*), dan minimalis.
3. **Pencegahan Teks Terpotong di e-Brochure:** Merancang ulang baris input e-Brochure menjadi kartu responsif sehingga nama mobil dengan tipe panjang tampil utuh tanpa terpotong.
4. **Optimasi Layout Mobile:** Penyempurnaan responsivitas tabel harga OTR, slider banner, dan kartu promosi pada perangkat smartphone.
5. **Resolusi Path Gambar Preview:** Penyesuaian path resolver otomatis untuk gambar lokal relatif agar tampil langsung dari storage GitHub.

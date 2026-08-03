# Website Sales Mobil Honda Bintaro v0.1

Website sales mobil Honda resmi untuk wilayah Bintaro & Jabodetabek. Antarmuka dikembangkan dengan performa tinggi, desain premium (dark-accented glassmorphism), serta sistem dinamisasi data terpusat menggunakan format JSON.

---

## 🚀 Fitur Utama Website

### 1. Dinamisasi Data Terpusat (Dynamic Content JSON)
Hampir seluruh teks, tautan, gambar, dan menu navigasi pada website diatur secara dinamis melalui file konfigurasi JSON. Ini mempermudah admin untuk mengubah informasi tanpa menyentuh kode HTML/JS secara langsung:
*   **`data/site_config.json`:** Mengatur menu navigasi, identitas sales (nama, WhatsApp, email, foto), teks e-brosur, detail kontak banner, deskripsi bank transfer, teks persyaratan kredit, hingga tautan eksternal media sosial.
*   **`data/products.json`:** Database spesifikasi teknis mobil, pilihan warna, kelengkapan fitur, galeri foto, urutan pemuatan mobil (`productOrder`), serta harga awal masing-masing tipe.
*   **`data/pricelist.json`:** Database harga OTR (On The Road) lengkap Jabodetabek untuk setiap varian mobil beserta paket pembelian aksesoris (Essential & Extra).

### 2. Katalog & Halaman Detail Produk Interaktif
*   **Grid Produk Dinamis:** Menampilkan jajaran mobil Honda di halaman utama yang secara otomatis dikelompokkan berdasarkan kategori (SUV, MPV, Sedan, City Car & Hatchback).
*   **Halaman Spesifik Model:** Tersedia 10 halaman detail model mobil resmi yang di-generate dinamis:
    *   *Accord, Brio (Satya/RS), BR-V, City Hatchback RS, Civic RS, CR-V, E:N1, HR-V, StepWGN, dan WR-V.*
    *   Menampilkan galeri slide foto beresolusi tinggi, daftar harga varian OTR, fitur-fitur unggulan, tabel spesifikasi lengkap (mesin, dimensi, transmisi, dsb) dalam bentuk akordeon, serta persyaratan kredit/simulasi cicilan.

### 3. e-Brochure Hub & Interactive PDF Viewer
*   Halaman **e-Brochure** (`/brochure/`) yang memuat grid brosur resmi mobil berdasarkan urutan menu.
*   **Interactive PDF Viewer:** Memungkinkan pelanggan membuka berkas PDF brosur langsung di dalam website melalui modal popup (menggunakan teknologi integrasi Google Drive Preview) tanpa perlu berpindah tab browser.
*   **Direct Download:** Dilengkapi opsi unduhan berkas PDF resmi untuk disimpan di perangkat pengguna secara langsung.

### 4. Tabel Daftar Harga OTR (Pricelist Mobil)
*   Halaman **Pricelist** (`/pricelist/`) yang menyajikan rincian harga OTR seluruh varian mobil Honda, Paket Prima (Essential), dan Paket Prima+ (Extra).
*   **Layout Adaptif (Responsive):** Rincian harga dirender dalam bentuk tabel berjenjang (`rowspan`) yang rapi pada desktop, dan otomatis bertransformasi menjadi susunan kartu merah premium pada layar mobile agar nyaman dibaca.
*   **Fallback API:** Dilengkapi sistem *fallback* yang otomatis menggunakan data cadangan lokal apabila koneksi internet ke API server mengalami kendala.

### 5. Tombol Pintas WhatsApp Dinamis (WhatsApp Templates)
*   Format pesan (template teks chat WA) dapat disesuaikan di dalam file JSON untuk berbagai aksi:
    *   *Tanya Promo Utama* (di Sales Banner).
    *   *Booking Test Drive* (Pesan khusus menyertakan model mobil pilihan).
    *   *Minta Pricelist / Brosur*.
*   Nomor WhatsApp sales disinkronkan secara global di seluruh tombol pintas di website.

### 6. Keamanan & Pencegahan Penipuan (Fraud Warning System)
*   Ikon notifikasi lonceng di bagian header yang secara interaktif membuka **Modal Peringatan Transaksi Aman**.
*   Menampilkan gambar himbauan resmi dealer agar pelanggan hanya melakukan transfer dana ke rekening resmi atas nama dealer **Honda Bintaro**.

---

## 🛠️ Riwayat Perubahan (Changelog v0.1)

Berikut adalah catatan rilis fitur dan perbaikan yang dikerjakan pada rilis perdana **v0.1**:

### 🛠️ Fitur Baru (New Features)
1.  **Dinamisasi Header & Footer:** Memisahkan struktur header/footer statis menjadi script asinkron (`header.js` dan `footer.js`) yang memuat data secara terpusat dari `site_config.json`.
2.  **Halaman Pricelist Mobil:** Membuat modul halaman `/pricelist/` yang memuat data OTR dari URL CDN argust.my.id dengan mekanisme data lokal fallback.
3.  **Halaman e-Brochure Mobil:** Membuat modul halaman `/brochure/` lengkap dengan modal penampil PDF Google Drive terintegrasi.
4.  **Generasi Halaman Produk Dinamis:** Menghasilkan 10 subhalaman detail produk di folder `/model/` yang terintegrasi secara dinamis dengan layout global.
5.  **Dinamisasi Persyaratan Kredit & Gambar Fraud:** Memindahkan teks persyaratan kredit dan tautan gambar popup fraud ke dalam konfigurasi JSON terpusat.

### 🐛 Perbaikan Bug & Optimasi (Bug Fixes & Optimizations)
1.  **Penanganan Glitch Transisi Menu:** Menghapus transisi default Tailwind saat pemuatan halaman pertama kali untuk mencegah sidebar navigasi dan modal berkedip (muncul lalu tertutup sendiri), digantikan dengan transisi asinkron `requestAnimationFrame`.
2.  **Koreksi Posisi Ikon Pencarian:** Menggeser posisi ikon kaca pembesar pencarian di kolom input header agar sejajar vertikal secara sempurna.
3.  **Perbaikan Bug Halaman Detail:** Menyelesaikan error runtime javascript (`Cannot set properties of null`) pada halaman detail model akibat pencarian elemen spesifikasi yang kosong.
4.  **Desain Responsif Banner Sales:** Mengoptimalkan tata letak responsive banner sales di perangkat tablet/mobile (breakpoint `lg`). Area biru (foto 1/3 & teks 2/3) diposisikan di atas, dan area merah (nama & tombol WhatsApp horizontal) berada di bawah untuk mencegah pemotongan wajah/kepala sales.
5.  **Dinamisasi Nomor WA:** Menyamakan seluruh nomor tujuan WhatsApp di tombol utama (booking test drive, footer, header) merujuk secara terpusat pada file konfigurasi sales.

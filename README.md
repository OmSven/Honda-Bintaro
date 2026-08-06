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

## 🛠️ Riwayat Perubahan (Changelog)

### Catatan Rilis v0.1.4
Rilis **v0.1.4** fokus pada perilisan Dashboard Admin Serverless terintegrasi API GitHub REST, optimasi visual (Light/Dark mode, kontras tombol, layout sticky footer), Pustaka Media mandiri, editor deskripsi CKEditor, dinamisasi penuh halaman promo/terima kasih, serta integrasi kunci lisensi perlindungan domain.

#### 🛠️ Fitur Baru (New Features)
1. **Dashboard Admin Serverless (`/login/`):** Antarmuka CMS premium (slate-glassmorphism) yang terhubung langsung dengan GitHub REST API menggunakan PAT Token. Admin dapat mengedit seluruh data website secara langsung dari browser tanpa perlu node, terminal, maupun workflow.
2. **Pustaka Media Dinamis (Media Library):** Modul untuk menampilkan daftar seluruh gambar di folder `assets/images/` GitHub. Admin dapat menyalin path relatif sekali klik atau menghapus file gambar secara permanen dari server GitHub.
3. **Double Previews & Auto Asset Replacement:** Menampilkan pratinjau gambar sebelum (di GitHub) dan sesudah (unggahan lokal) berdampingan. Saat mengganti gambar, sistem secara otomatis menghapus file gambar lama di repositori GitHub sebelum mengunggah file baru.
4. **Editor Teks Visual (CKEditor 5):** Integrasi CKEditor 5 untuk mempermudah penulisan deskripsi spesifikasi mobil dengan format visual kaya fitur (bold, list bullet, dsb).
5. **Dinamisasi Halaman Promo Utama:** Menambahkan integrasi dinamis pada `/promo/index.html` sehingga badge, judul hero, dan deskripsi promo dimuat langsung dari `site_config.json`.
6. **Sub-Tab Konfigurasi Komprehensif:** Menyediakan form pengeditan lengkap untuk navigasi menu (JSON editor), CNAME API link berita, e-brosur PDF Drive ID, SEO meta per halaman, detail bank footer, dan persyaratan kredit.
7. **Security Gate Akses Kata Sandi (SHA-256):** Gerbang login interaktif (`#login-gate`) untuk membatasi akses ke dashboard admin menggunakan enkripsi SHA-256 yang aman dan diverifikasi secara client-side menggunakan browser *Web Crypto API*.
8. **Modul Pengaktifan Lisensi (License Key):** Menambahkan tab setelan *License Key* di dashboard admin serta pengamanan pemblokiran dinamis pada saat pemuatan website (domain lock) menggunakan verifikasi hash SHA-256 terenkripsi terpusat.
9. **Tombol Pintas "Lihat Website":** Menyediakan tombol tautan eksternal baru di header dasbor untuk mempermudah administrator membuka dan mempratinjau halaman website live pada tab browser baru.
10. **Dropdown Status Lencana Produk:** Mengubah selektor status produk baru yang sebelumnya berupa checkbox menjadi dropdown pilihan dinamis yang mendukung lencana status "New" (warna oranye) dan lencana premium "All New" (warna merah menyala dengan teks putih).

#### 🐛 Perbaikan Bug & Optimasi (Bug Fixes & Optimizations)
1. **Perbaikan Layout Sticky Footer:** Menggunakan Flexbox CSS murni agar footer secara otomatis terdorong dan terkunci di dasar layar browser pada halaman berkonten pendek.
2. **Fix Kontras Teks Mode Terang:** Menyempurnakan pewarnaan mode terang untuk memaksa tombol berlatar gelap (`bg-slate-800`, dsb.) dan tombol aksen merah (`bg-red-600`) tetap menampilkan teks putih kontras tinggi yang mudah dibaca.
3. **Hotfix Syntax Error Template Literal:** Memperbaiki kesalahan penulisan parameter `'{salesName}'` pada render card promo di mana backticks (`` ` ``) bersarang sempat menyebabkan *unresponsive button* pada dashboard.
4. **Resolusi Path Gambar Preview:** Menambahkan path resolver `resolveImagePreviewUrl` agar relative path lokal (seperti `assets/images/...`) otomatis diterjemahkan menjadi URL langsung dari storage server GitHub agar tampil sempurna di panel preview.
5. **Pemuatan Data Lokal Awal (Local Preloading):** Menambahkan pembacaan asinkron file JSON lokal pada page-load sehingga logo dealer dan input form dapat langsung terpopulasi sejak awal meskipun Token PAT GitHub belum tersambung.
6. **Fix Keterbacaan Teks Dropzone & Info Domain (Light Mode):** Memperbaiki kontras teks instruksi pada kolom seret berkas (dropzone) serta teks status domain lisensi di mode terang agar berwarna gelap pekat sehingga mudah dibaca.
7. **Redesain Notifikasi Bantuan (Solid Toasts):** Mengubah warna latar belakang popup notifikasi toast yang melayang di pojok kiri bawah menjadi warna solid berbayang tebal agar teks notifikasi sukses atau gagal memiliki tingkat keterbacaan yang tinggi.
8. **Mekanisme Cache-Busting & Keamanan Tambahan:** Menambahkan penanda waktu asinkron pada pembacaan database lisensi untuk mencegah browser melakukan caching, serta menyematkan sistem proteksi pengalihan nomor chat jika validasi lisensi dilewati.

---

### Catatan Rilis v0.1.3
Rilis **v0.1.3** fokus pada penyempurnaan UI preloader, integrasi grid Promo Terbaru dari data terpusat, pengurutan navigasi Model, serta perbaikan bugs/konflik styling pada landing page dan homepage.

#### 🛠️ Fitur Baru (New Features)
1. **Section Promo Terbaru (Dinamis dari JSON):** Menambahkan section "Promo Terbaru Honda Bintaro" di `/promo/` yang merender 4 kartu promosi terpusat secara dinamis dari file `site_config.json` (termasuk banner kustom "Rp 300JT*").
2. **Navigasi Bersih & Menu Promo Baru:** Menyisipkan menu "Promo Honda 2026" ke navigasi utama, serta memperbarui dropdown menu "Model" di sidebar agar memuat daftar tipe mobil resmi Honda yang riil (Brio, HR-V, Accord, dll.) secara terurut sesuai daftar prioritas `productOrder`.
3. **Preloader Global Lebih Besar:** Memperbesar ukuran overlay preloader transisi di `header.js` dari 64px menjadi 140px agar logo GIF animasi Honda tampil lebih megah dan premium.

#### 🐛 Perbaikan Bug & Optimasi (Bug Fixes & Optimizations)
1. **Resolusi Bug ReferenceError Halaman Promo:** Memperbaiki bug error pembacaan variabel `phone` di `/promo/` yang sempat menyebabkan pemuatan seluruh produk dinamis terhenti (kini sudah lancar 100%).
2. **Fix Konflik Warna Hover Kategori:** Mengatasi bug teks tidak terbaca saat di-hover pada kategori tombol lineup aktif di homepage (`index.html`) dengan mengubah hover-state menjadi `hover:text-white` secara dinamis.
3. **Keandalan Akordion Model:** Mengembalikan pemicu klik sidebar "Model" untuk selalu membuka accordion list kategori pada mobile & desktop guna menjamin stabilitas navigasi menu.

---

### Catatan Rilis v0.1.2
Rilis **v0.1.2** fokus pada optimalisasi SEO & Meta Sharing WhatsApp, pembuatan Landing Page Google Ads berkonversi tinggi, Halaman Terima Kasih dinamis, serta otomatisasi sinkronisasi SEO statis.

#### 🛠️ Fitur Baru (New Features)
1. **Sistem Sinkronisasi SEO Statis (`sync_seo.js`):** Script otomatisasi Node.js untuk menyelaraskan tag metadata SEO (`title`, `description`, `keywords`, `og:image`, `twitter:card`, `favicon`) di seluruh 15+ file HTML website berdasarkan pengaturan terpusat di `site_config.json`.
2. **Dynamic Year Parser:** Script client-side di `header.js` yang menerjemahkan penanda `{year}` di judul halaman secara dinamis menjadi tahun berjalan saat ini (misal: 2026).
3. **Landing Page Iklan Google Ads (`/promo/`):** Halaman khusus iklan tanpa distraksi navigasi dengan fitur countdown timer 24 jam (reset harian), indikator kuota dinamis (5 ke 0 menggunakan `localStorage`), dan grid 4 kolom mobil terlaris yang dinamis dari JSON.
4. **Halaman Terima Kasih Dinamis (`/thank-you/`):** Halaman sasaran konversi iklan berbayar dengan header & footer terpusat, serta seluruh konten teks halaman yang dapat dikustomisasi secara dinamis dari `site_config.json`.
5. **OpenGraph Preview WhatsApp:** Mengatur gambar pratinjau tautan WhatsApp secara dinamis (menggunakan gambar model mobil spesifik dari `products.json` or fallback logo resmi Honda dari JSON).

#### 🐛 Perbaikan Bug & Optimasi (Bug Fixes & Optimizations)
1. **Penyempurnaan Regex Pembersihan SEO:** Memperbaiki script sinkronisasi agar mendukung pembersihan tag `<link>` berformat self-closing (tanpa tag penutup `</link>`).
2. **Optimasi Gambar Grid Promo:** Mengubah rasio gambar kartu mobil di landing page menjadi kotak penuh (`aspect-square`) dengan mode `object-cover` agar gambar visual marketing mengisi penuh area box secara estetik.
3. **Integrasi FAQ Dinamis:** Memindahkan daftar Pertanyaan Umum (FAQ) di landing page promo agar dibaca secara dinamis dari file JSON global.

---

### Catatan Rilis v0.1
Berikut adalah catatan rilis fitur dan perbaikan yang dikerjakan pada rilis perdana **v0.1**:

#### 🛠️ Fitur Baru (New Features)
1.  **Dinamisasi Header & Footer:** Memisahkan struktur header/footer statis menjadi script asinkron (`header.js` dan `footer.js`) yang memuat data secara terpusat dari `site_config.json`.
2.  **Halaman Pricelist Mobil:** Membuat modul halaman `/pricelist/` yang memuat data OTR dari URL CDN argust.my.id dengan mekanisme data lokal fallback.
3.  **Halaman e-Brochure Mobil:** Membuat modul halaman `/brochure/` lengkap dengan modal penampil PDF Google Drive terintegrasi.
4.  **Generasi Halaman Produk Dinamis:** Menghasilkan 10 subhalaman detail produk di folder `/model/` yang terintegrasi secara dinamis dengan layout global.
5.  **Dinamisasi Persyaratan Kredit & Gambar Fraud:** Memindahkan teks persyaratan kredit dan tautan gambar popup fraud ke dalam konfigurasi JSON terpusat.

#### 🐛 Perbaikan Bug & Optimasi (Bug Fixes & Optimizations)
1.  **Penanganan Glitch Transisi Menu:** Menghapus transisi default Tailwind saat pemuatan halaman pertama kali untuk mencegah sidebar navigasi dan modal berkedip (muncul lalu tertutup sendiri), digantikan dengan transisi asinkron `requestAnimationFrame`.
2.  **Koreksi Posisi Ikon Pencarian:** Menggeser posisi ikon kaca pembesar pencarian di kolom input header agar sejajar vertikal secara sempurna.
3.  **Perbaikan Bug Halaman Detail:** Menyelesaikan error runtime javascript (`Cannot set properties of null`) pada halaman detail model akibat pencarian elemen spesifikasi yang kosong.
4.  **Desain Responsif Banner Sales:** Mengoptimalkan tata letak responsive banner sales di perangkat tablet/mobile (breakpoint `lg`). Area biru (foto 1/3 & teks 2/3) diposisikan di atas, dan area merah (nama & tombol WhatsApp horizontal) berada di bawah untuk mencegah pemotongan wajah/kepala sales.
5.  **Dinamisasi Nomor WA:** Menyamakan seluruh nomor tujuan WhatsApp di tombol utama (booking test drive, footer, header) merujuk secara terpusat pada file konfigurasi sales.

# Alur Sistem

Uraian berikut disusun untuk mendukung penulisan metodologi dan perancangan sistem pada skripsi. Penjelasan difokuskan pada logika kerja sistem secara konseptual, tanpa merujuk pada nama perangkat lunak, kerangka kerja, atau platform implementasi tertentu.

## Deskripsi Sistem

Secara umum, sistem dirancang untuk membantu pengguna melakukan analisis kerawanan banjir pada tingkat wilayah administratif yang relevan dengan objek penelitian. Alur kerja sistem dibangun melalui beberapa tahapan utama, yaitu autentikasi pengguna, pemilihan wilayah, pemrosesan data masukan, analisis prediktif, penyimpanan hasil, serta penyajian informasi pada halaman ringkasan dan riwayat.

Pada tahap awal, pengguna mengakses sistem melalui antarmuka utama. Sistem kemudian memeriksa status autentikasi. Apabila pengguna belum memiliki akses yang sah, sistem mengarahkan pengguna untuk melakukan masuk atau pendaftaran akun. Setelah proses autentikasi berhasil, pengguna diarahkan ke halaman utama yang menjadi pusat navigasi seluruh fitur sistem.

Pada modul prediksi, pengguna memilih wilayah administratif dan memasukkan nilai curah hujan. Sistem melakukan pemeriksaan kelengkapan data sebelum melanjutkan proses analisis. Jika data belum lengkap, sistem meminta pengguna untuk melengkapi isian yang diperlukan. Apabila data telah memenuhi ketentuan, sistem mengambil data pendukung wilayah, menjalankan proses analisis prediktif, menghitung kelas risiko beserta tingkat keyakinan, lalu menyimpan hasilnya ke dalam basis data.

Hasil yang tersimpan kemudian digunakan kembali oleh modul penyajian informasi. Modul ringkasan menampilkan ikhtisar hasil prediksi secara umum, sedangkan modul riwayat menyajikan daftar hasil prediksi yang dapat ditelusuri berdasarkan kriteria tertentu. Dengan demikian, data yang sama dapat dimanfaatkan secara konsisten pada beberapa halaman tanpa mengubah logika utama sistem.

## Alur Kerja Sistem

1. Pengguna mengakses sistem melalui antarmuka utama.
2. Sistem memeriksa status autentikasi pengguna.
3. Apabila pengguna belum terautentikasi, sistem menampilkan proses masuk atau pendaftaran akun.
4. Setelah autentikasi berhasil, sistem menampilkan halaman utama.
5. Pengguna memilih fitur yang akan digunakan, terutama fitur prediksi risiko banjir.
6. Pada fitur prediksi, pengguna menentukan wilayah dan mengisi nilai curah hujan.
7. Sistem memeriksa kelengkapan data masukan.
8. Jika data belum lengkap, sistem meminta pengguna melengkapi isian dan proses kembali ke tahap input.
9. Jika data telah lengkap, sistem mengambil data pendukung wilayah dan menjalankan proses analisis prediktif.
10. Sistem menghasilkan kelas risiko, skor risiko, dan tingkat keyakinan, lalu menyimpan hasil analisis ke dalam basis data.
11. Hasil prediksi ditampilkan kepada pengguna beserta informasi pendukung yang relevan.
12. Data yang tersimpan digunakan kembali untuk membentuk ringkasan sistem, riwayat prediksi, dan pengelolaan akun pengguna.

## Keterangan Diagram

- Simbol terminator digunakan untuk menandai awal dan akhir proses.
- Simbol proses digunakan untuk menunjukkan aktivitas yang dilakukan oleh sistem.
- Simbol keputusan digunakan untuk menampilkan percabangan berdasarkan kondisi tertentu.
- Simbol masukan/keluaran digunakan untuk menggambarkan interaksi antara pengguna dan sistem.

## File Diagram

- Versi vektor: [flowchart-alur-sistem-akademik.svg](./flowchart-alur-sistem-akademik.svg)
- Versi raster: [flowchart-alur-sistem-akademik.png](./flowchart-alur-sistem-akademik.png)

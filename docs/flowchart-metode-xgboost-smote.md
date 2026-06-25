# Flowchart Metode XGBoost dan SMOTE

Flowchart berikut menggambarkan alur metodologi pembentukan model prediksi kerawanan banjir menggunakan pendekatan pembelajaran mesin dengan penanganan ketidakseimbangan kelas.

## Deskripsi Metode

Tahapan penelitian dimulai dari pemuatan dataset penelitian yang berisi variabel input dan label target. Selanjutnya dilakukan penyelarasan label agar penamaan kelas konsisten, pemilihan atribut yang digunakan sebagai fitur, serta penanganan nilai hilang menggunakan nilai tengah.

Setelah data siap, label target diubah ke bentuk numerik agar dapat diproses oleh model. Data kemudian dibagi menjadi data latih dan data uji dengan komposisi tertentu. Karena distribusi kelas tidak seimbang, data latih diseimbangkan menggunakan metode oversampling sintetis.

Dataset yang telah seimbang digunakan untuk melatih model klasifikasi. Hasil pelatihan kemudian diuji menggunakan data uji untuk memperoleh nilai evaluasi. Setelah model dinyatakan layak, sistem menghasilkan prediksi pada seluruh dataset, menghitung probabilitas kelas, menyusun skor risiko, dan mengelompokkan tingkat kerawanan.

## File Diagram

- Versi vektor: [flowchart-metode-xgboost-smote.svg](./flowchart-metode-xgboost-smote.svg)
- Versi raster: [flowchart-metode-xgboost-smote.png](./flowchart-metode-xgboost-smote.png)

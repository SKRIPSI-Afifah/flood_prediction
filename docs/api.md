# FloodRisk Aceh API Documentation

Dokumentasi ini mengikuti implementasi aktual di proyek:
- FastAPI backend: [`model/api.py`](../model/api.py)
- Next.js API routes: [`app/api`](../app/api)
- Penyimpanan hasil prediksi: tabel `public.predictions`

## 1. Alur Data

`Browser -> POST /api/predict -> FastAPI POST /predict -> simpan ke Supabase -> dibaca Dashboard dan Riwayat`

## 2. FastAPI

### GET `/health`

Tujuan:
- Cek status service FastAPI.

Request:
- Tidak ada parameter.

Response sukses `200`:
```json
{ "status": "ok" }
```

---

### POST `/predict`

Tujuan:
- Menerima input faktor banjir.
- Menghasilkan kelas prediksi, confidence, dan probabilitas kelas.

Request body:
```json
{
  "adm3_pcode": "1101010",
  "hujan_mm": 120.5,
  "elevasi": 15.2,
  "slope": 4.1,
  "lahan_terbangun": 0.327
}
```

Field request:
- `adm3_pcode` `string` wajib
- `hujan_mm` `number` wajib, `0-1000` mm
- `elevasi` `number` wajib, `0-3000` m
- `slope` `number` wajib, `0-45` persen
- `lahan_terbangun` `number` wajib, proporsi `0-1`

Response sukses `200`:
```json
{
  "predicted_class": "Rawan",
  "confidence": 0.8234,
  "description": "Risiko banjir sedang. Perlu kewaspadaan saat curah hujan meningkat.",
  "probabilities": {
    "Aman": 0.1021,
    "Rawan": 0.8234,
    "Sangat Rawan": 0.0745
  }
}
```

Field response:
- `predicted_class` `string`
- `confidence` `number`
- `description` `string`
- `probabilities` `object`
  - `Aman` `number`
  - `Rawan` `number`
  - `Sangat Rawan` `number`

Catatan validasi:
- Input di luar rentang realistis akan ditolak sebelum prediksi dijalankan.
- Batas ini sengaja dibuat lebih ketat agar angka ekstrem tidak menghasilkan prediksi yang menyesatkan.

Error response contoh:
```json
{ "detail": "Model file tidak ditemukan" }
```

## 3. Next.js API

### POST `/api/predict`

Tujuan:
- Menerima request dari browser.
- Memvalidasi payload.
- Meneruskan data ke FastAPI `/predict`.
- Menyimpan hasil prediksi ke Supabase.

Request body:
```json
{
  "adm3_pcode": "1101010",
  "hujan_mm": 120.5,
  "elevasi": 15.2,
  "slope": 4.1,
  "lahan_terbangun": 0.327,
  "tahun": 2026
}
```

Catatan:
- `tahun` optional.
- `year` juga diterima sebagai alias input.
- `rainfall` diterima sebagai alias `hujan_mm`.
- `lahan_terbangun` diperlakukan sebagai proporsi `0-1`, bukan persen `0-100`.

Response sukses `200`:
```json
{
  "predicted_class": "Rawan",
  "prediksi": "Rawan",
  "confidence": 0.8234,
  "probabilities": {
    "Aman": 0.1021,
    "Rawan": 0.8234,
    "Sangat Rawan": 0.0745
  },
  "description": "Risiko banjir sedang. Perlu kewaspadaan saat curah hujan meningkat.",
  "saved": true,
  "prediction": {
    "id": 123,
    "user_id": "uuid-user",
    "adm3_pcode": "1101010",
    "kabupaten": "Aceh Besar",
    "kecamatan": "Kuta Baro",
    "tahun": 2026,
    "rainfall": 120.5,
    "elevation": 15.2,
    "slope": 4.1,
    "built_area": 0.327,
    "predicted_class": "Rawan",
    "confidence": 0.8234,
    "probability_aman": 0.1021,
    "probability_rawan": 0.8234,
    "probability_sangat_rawan": 0.0745,
    "created_at": "2026-06-19T10:30:00.000Z"
  },
  "raw": {}
}
```

Field response:
- `predicted_class` `string`
- `prediksi` `string`
- `confidence` `number | null`
- `probabilities` `object`
- `description` `string | null`
- `saved` `boolean`
- `prediction` object hasil insert ke Supabase
- `raw` response mentah dari FastAPI

Error response:
- `400` payload tidak valid
- `401` user belum login
- `502` FastAPI mengembalikan kelas prediksi yang tidak valid
- `500` error internal

---

### GET `/api/dashboard`

Tujuan:
- Mengambil ringkasan dashboard untuk user aktif.

Response sukses `200`:
```json
{
  "total_kecamatan": 123,
  "total_factor_data": 120,
  "total_predictions": 45,
  "predictions_current_year": 18,
  "distinct_prediction_regions": 30,
  "class_counts": {
    "Aman": 10,
    "Rawan": 25,
    "Sangat Rawan": 10
  },
  "latest_predictions": [],
  "map_points": []
}
```

Field response:
- `total_kecamatan` `number`
- `total_factor_data` `number`
- `total_predictions` `number`
- `predictions_current_year` `number`
- `distinct_prediction_regions` `number`
- `class_counts` `object`
- `latest_predictions` `array`
- `map_points` `array`

### GET `/api/riwayat`

Tujuan:
- Mengambil daftar riwayat prediksi dengan filter dan pagination.

Query params:
- `kabupaten` `string`
- `kecamatan` `string`
- `year` `string | number`
- `tahun` alias untuk `year`
- `risk` `string`
- `tingkat` alias untuk `risk`
- `date_from` `YYYY-MM-DD`
- `date_to` `YYYY-MM-DD`
- `page` `number`, default `1`
- `page_size` `number`, default `10`

Response sukses `200`:
```json
{
  "rows": [],
  "total": 0,
  "total_pages": 0,
  "page": 1,
  "page_size": 10,
  "filters": {
    "kabupaten": "",
    "kecamatan": "",
    "year": "",
    "risk": "",
    "dateFrom": "",
    "dateTo": "",
    "page": 1,
    "pageSize": 10
  },
  "kabupaten_list": [],
  "kecamatan_list": []
}
```

Field row riwayat:
- `id`
- `user_id`
- `adm3_pcode`
- `kabupaten`
- `kecamatan`
- `tahun`
- `rainfall`
- `elevation`
- `slope`
- `built_area`
- `predicted_class`
- `confidence`
- `probability_aman`
- `probability_rawan`
- `probability_sangat_rawan`
- `created_at`
- `latitude`
- `longitude`

### GET `/api/riwayat/[id]`

Tujuan:
- Mengambil detail satu prediksi.

Path param:
- `id` `number`

Response sukses `200`:
```json
{
  "prediction": {
    "id": 123
  }
}
```

Error:
- `400` ID tidak valid
- `401` user belum login
- `404` riwayat tidak ditemukan

### GET `/api/wilayah`

Tujuan:
- Mengambil master wilayah kecamatan dari Supabase.

Query params:
- `adm3_pcode` `string`
- `kabupaten` `string`

Response:
```json
{
  "wilayah": [],
  "kabupatenList": []
}
```

Jika `adm3_pcode` dikirim, response berupa satu objek `wilayah`.
Jika `kabupaten` dikirim, response berupa array `wilayah`.

## 4. Field yang Disimpan ke Supabase

Tabel: `public.predictions`

Kolom yang dipakai:
- `adm3_pcode`
- `kabupaten`
- `kecamatan`
- `tahun`
- `rainfall`
- `elevation`
- `slope`
- `built_area`
- `predicted_class`
- `confidence`
- `probability_aman`
- `probability_rawan`
- `probability_sangat_rawan`
- `user_id`
- `created_at`

## 5. Contoh Alur Browser

1. User memilih wilayah dan curah hujan di halaman Prediksi.
2. Frontend memanggil `POST /api/predict`.
3. Next.js memvalidasi payload, memanggil FastAPI `/predict`.
4. FastAPI mengembalikan hasil prediksi.
5. Next.js menyimpan hasil ke Supabase.
6. Dashboard memuat ringkasan dari `GET /api/dashboard`.
7. Riwayat memuat data dari `GET /api/riwayat` dan `GET /api/riwayat/[id]`.

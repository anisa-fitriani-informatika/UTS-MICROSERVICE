# UTS Sistem Terdistribusi - Implementasi Microservices dengan ActiveMQ

Project ini mendemonstrasikan arsitektur Microservices menggunakan **Message Broker (ActiveMQ)** untuk proses pendaftaran mahasiswa secara asinkron.

## Anggota Kelompok / Identitas
- **Nama:** Anisa Fitriani
- **NIM:** IF0223008
- **Prodi:** Informatika
- **Kampus:** Universitas Muhammadiyah Karanganyar (UMUKA)

## Arsitektur Sistem
1. **Service 1 (Producer):** Menggunakan Express.js untuk menerima request pendaftaran dari client (Postman) dan mengirimkannya ke antrean ActiveMQ.
2. **Message Broker:** Apache ActiveMQ (menggunakan protokol AMQP 1.0).
3. **Service 2 (Consumer/Worker):** Mengambil pesan dari antrean dan mensimulasikan proses pengiriman email verifikasi.

## Persyaratan Sistem
- Node.js (versi terbaru)
- Apache ActiveMQ (Running di localhost:8161)
- Library: `express`, `rhea`, `body-parser`

## Cara Menjalankan Aplikasi
1. **Ekstrak/Clone** repository ini.
2. Buka terminal di folder project, lalu jalankan:
   ```bash
   npm install
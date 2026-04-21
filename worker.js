const container = require('rhea');

// KONFIGURASI KONEKSI (Sama kayak Producer, wajib admin:admin)
const connection = container.connect({ 
    host: 'localhost', 
    port: 5672,
    username: 'admin', 
    password: 'admin' 
});

// Saat koneksi ke ActiveMQ terbuka
connection.on('connection_open', (context) => {
    // Membuka antrean 'registration_queue' untuk menerima pesan
    context.connection.open_receiver('registration_queue');
    console.log("-----------------------------------------");
    console.log(" [*] WORKER AKTIF & TERHUBUNG!");
    console.log(" [*] Menunggu data pendaftaran masuk...");
    console.log("-----------------------------------------");
});

// Event saat ada pesan/data masuk ke antrean
container.on('message', (context) => {
    // Mengambil data dan mengubahnya kembali dari string ke JSON
    const user = JSON.parse(context.message.body);

    console.log(`\n [LOG] ADA DATA BARU!`);
    console.log(` [LOG] Sedang mengirim email verifikasi ke: ${user.email}...`);
    
    // Simulasi loading 2 detik biar kayak beneran ngirim email
    setTimeout(() => {
        console.log(` [LOG] SUKSES! User [${user.nama}] dari prodi [${user.prodi}] resmi terdaftar.`);
        console.log(` ------------------------------------------------------------`);
    }, 2000);
});

// Log jika ada error biar nggak bingung kalau tiba-tiba mati
connection.on('error', (err) => {
    console.error(" [!] WORKER ERROR:", err.message);
});
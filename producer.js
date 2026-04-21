const express = require('express');
const container = require('rhea');
const app = express();

app.use(express.json());

// KONFIGURASI KONEKSI (Pakai Login Admin)
const connection = container.connect({ 
    host: 'localhost', 
    port: 5672,
    username: 'admin', // Menghindari error "Invalid Protocol"
    password: 'admin' 
});

let sender = null;

// Event saat koneksi ke ActiveMQ berhasil terbuka
connection.on('connection_open', (context) => {
    sender = context.connection.open_sender('registration_queue');
    console.log("-----------------------------------------");
    console.log(" [!] AKHIRNYA CONNECT! Producer siap kirim.");
    console.log("-----------------------------------------");
});

// Event jika ada error koneksi (biar ketahuan kalau ActiveMQ mati)
connection.on('error', (err) => {
    console.error(" [!] ERROR KONEKSI:", err.message);
});

// ENDPOINT API UNTUK POSTMAN
app.post('/register', (req, res) => {
    const { nama, email, prodi } = req.body;

    // Cek apakah sender sudah siap dan bisa mengirim pesan
    if (sender && sender.sendable()) {
        const dataUser = { nama, email, prodi };
        
        // Mengirim pesan dalam bentuk JSON string
        sender.send({ body: JSON.stringify(dataUser) });

        console.log(" [x] Data masuk antrean:", dataUser);
        
        res.status(202).json({
            message: "Pendaftaran sedang diproses, silakan cek email secara berkala."
        });
    } else {
        console.log(" [!] Gagal kirim: Sender belum siap.");
        res.status(500).json({ 
            message: "ActiveMQ belum siap atau koneksi terputus! Cek jendela hitam ActiveMQ." 
        });
    }
});

// Jalankan Server Express
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n Server Producer jalan di http://localhost:${PORT}`);
    console.log(` [*] Menunggu request dari Postman...`);
});
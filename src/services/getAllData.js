// Mengimpor Firestore dari Google Cloud
const { Firestore } = require('@google-cloud/firestore');

// Fungsi untuk mengambil semua data dari koleksi 'predictions'
async function getAllData() {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');
    
    // Mengambil semua data dari koleksi 'predictions'
    const allData = await predictCollection.get();
    return allData; // Mengembalikan data yang diambil
}

// Mengekspor fungsi untuk digunakan di bagian lain aplikasi
module.exports = getAllData;
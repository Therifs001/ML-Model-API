// Mengimpor TensorFlow.js untuk Node.js
const tf = require('@tensorflow/tfjs-node'); 
 
// Fungsi untuk memuat model machine learning dari URL yang diberikan
async function loadModel() { 
    try { 
        // Mencetak URL model yang akan dimuat dari file .env
        console.log('Model URL:', process.env.MODEL_URL);  
        // Memuat model menggunakan URL yang diberikan di environment variable
        const model = await tf.loadGraphModel(process.env.MODEL_URL); 
        // Menampilkan pesan jika model berhasil dimuat
        console.log('Model successfully loaded'); 
        return model; 
    } catch (error) { 
        // Menampilkan pesan kesalahan jika gagal memuat model
        console.error('Failed to load model:', error); 
        throw new Error('Model could not be loaded'); 
    } 
} 
 
// Mengekspor fungsi loadModel untuk digunakan di bagian lain aplikasi
module.exports = loadModel;
import handlers from '../server/handler.js';

// Definisi rute untuk aplikasi
const routes = [
  {
    // Rute untuk melakukan prediksi
    path: '/predict', // Endpoint untuk prediksi
    method: 'POST', // Metode HTTP POST digunakan untuk mengirimkan data
    handler: handlers.postPredict, // Fungsi handler untuk menangani logika prediksi
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  },
  {
    // Rute untuk mengambil riwayat prediksi
    path: '/predict/histories', // Endpoint untuk melihat riwayat prediksi
    method: 'GET', // Metode HTTP GET digunakan untuk mengambil data
    handler: handlers.getPredictHistories, // Fungsi handler untuk menangani pengambilan riwayat
  },
];

// Mengekspor daftar rute untuk digunakan di server
export default routes;
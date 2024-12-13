// Mengimpor Firestore dari Google Cloud
const { Firestore } = require('@google-cloud/firestore');
 
// Fungsi untuk menyimpan data prediksi ke dalam koleksi 'prediction' di Firestore
async function storeData(id, data) {
  const db = new Firestore(); // Membuat instansi Firestore untuk mengakses database
 
  const predictCollection = db.collection('prediction'); // Mengakses koleksi 'prediction' di Firestore
  return predictCollection.doc(id).set(data); // Menyimpan data menggunakan ID yang diberikan dan data yang diterima
}
 
// Mengekspor fungsi storeData agar dapat digunakan di bagian lain aplikasi
module.exports = storeData;
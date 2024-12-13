 API ML -Model

 PORT : 3001
 HOST : 0.0.0.0

path: '/predict', // Endpoint untuk prediksi
method: 'POST', // Metode HTTP POST digunakan untuk mengirimkan data
handler: handlers.postPredict, // Fungsi handler untuk menangani logika prediksi

Kategori :
'Common Rust', 'Gray Leaf Spot', 'Blight', 'Healthy'
output
jika Common Rust : Gunakan produk: Tilt 250EC (Propiconazole), Quadris (Azoxystrobin).
jika Gray Leaf Spot : Gunakan produk: Tilt 250EC (Propiconazole), Headline (Pyraclostrobin), Dithane M-45 (Mancozeb).
jika Blight : Gunakan produk: Folicur 430SC (Tebuconazole), Quadris (Azoxystrobin)
jika Healthy : Daun jagung sehat. Tidak diperlukan tindakan.

 

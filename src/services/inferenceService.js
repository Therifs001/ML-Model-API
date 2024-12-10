const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
  
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const labels = ['Common Rust', 'Gray Leaf Spot', 'Blight', 'Healthy'];
        const confidenceIndex = scores.indexOf(Math.max(...scores));
        const label = labels[confidenceIndex];

        let suggestion;
        switch (label) {
            case 'Common Rust':
                suggestion = `
            Gunakan Fungisida ini:
            Triazoles: Fungisida dengan bahan aktif seperti propiconazole atau tebuconazole efektif dalam mengatasi infeksi jamur ini.
            Strobilurins: Azoxystrobin juga dapat membantu mengendalikan infeksi common rust.
            Contoh produk: Tilt 250EC (Propiconazole), Quadris (Azoxystrobin).
        `;
                break;
            case 'Gray Leaf Spot':
                suggestion = `
            Gunakan Fungisida ini:
            Triazoles seperti propiconazole, tebuconazole, atau difenoconazole sangat efektif untuk pengendalian.
            Strobilurins seperti azoxystrobin dan pyraclostrobin juga dapat digunakan untuk mengurangi infeksi.
            Kontak Fungisida: Mancozeb dan Chlorothalonil (misalnya Bravo atau Dithane) dapat digunakan pada kondisi infeksi awal.
            Contoh produk: Tilt 250EC (Propiconazole), Headline (Pyraclostrobin), Dithane M-45 (Mancozeb).
        `;
                break;
            case 'Blight':
                suggestion = `
            Gunakan Fungisida ini:
            Triazoles (misalnya propiconazole dan tebuconazole) untuk menghambat pertumbuhan jamur.
            Strobilurins (seperti azoxystrobin atau pyraclostrobin) untuk mengurangi penyebaran infeksi.
            Contoh produk: Folicur 430SC (Tebuconazole), Quadris (Azoxystrobin).
        `;
                break;
            case 'Healthy':
                suggestion = 'Tidak ada perawatan yang diperlukan. Tanaman sehat.';
                break;
        }
 
        return { label, suggestion};
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi')
    }
}
 
module.exports = predictClassification;
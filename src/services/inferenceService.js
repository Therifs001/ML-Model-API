const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const classes = ['Common Rust', 'Gray Leaf Spot', 'Blight','Healthy'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
 
        let explanation, suggestion;
 
        if(label === 'Common Rust') {
            explanation = "Gunakan Fungisida ini:"
            suggestion = "Triazoles: Fungisida dengan bahan aktif seperti propiconazole atau tebuconazole efektif dalam mengatasi infeksi jamur ini.Strobilurins: Azoxystrobin juga dapat membantu mengendalikan infeksi common rust.Contoh produk: Tilt 250EC (Propiconazole), Quadris (Azoxystrobin)."
        }
 
        if(label === 'Gray Leaf Spot') {
            explanation = "Gunakan Fungisida ini:"
            suggestion = "Triazoles seperti propiconazole, tebuconazole, atau difenoconazole sangat efektif untuk pengendalian.Strobilurins seperti azoxystrobin dan pyraclostrobin juga dapat digunakan untuk mengurangi infeksi.Kontak Fungisida: Mancozeb dan Chlorothalonil (misalnya Bravo atau Dithane) dapat digunakan pada kondisi infeksi awal.Contoh produk: Tilt 250EC (Propiconazole), Headline (Pyraclostrobin), Dithane M-45 (Mancozeb)."
        }
 
        if(label === 'Blight') {
            explanation = "Gunakan Fungisida ini:"
            suggestion = "Triazoles (misalnya propiconazole dan tebuconazole) untuk menghambat pertumbuhan jamur.Strobilurins (seperti azoxystrobin atau pyraclostrobin) untuk mengurangi penyebaran infeksi.Contoh produk: Folicur 430SC (Tebuconazole), Quadris (Azoxystrobin)."
        
        }
        if(label === 'Healthy') {
            explanation = "Healty."
            suggestion = "Tidak ada perawatan yang diperlukan. Tanaman sehat."
        
        }
 
        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;

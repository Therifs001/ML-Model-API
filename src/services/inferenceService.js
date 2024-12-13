const tf = require('@tensorflow/tfjs-node'); 
const InputError = require('../exceptions/InputError'); 

async function predictClassification(model, image) { 
    try { 
        // Preprocessing image
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        // Model prediction
        const prediction = model.predict(tensor);
        const probabilities = await prediction.data(); // [0.1, 0.2, 0.05, 0.65]

        // Mapping output to labels
        const labels = ['Common Rust', 'Gray Leaf Spot', 'Blight', 'Healthy'];
        const maxIndex = probabilities.indexOf(Math.max(...probabilities));
        const label = labels[maxIndex]; // Predicted label based on highest probability

        // Suggestions based on the label
        let suggestion;
        switch (label) {
            case 'Common Rust':
                suggestion = "Gunakan produk: Tilt 250EC (Propiconazole), Quadris (Azoxystrobin).";
                break;
            case 'Gray Leaf Spot':
                suggestion = "Gunakan produk: Tilt 250EC (Propiconazole), Headline (Pyraclostrobin), Dithane M-45 (Mancozeb).";
                break;
            case 'Blight':
                suggestion = "Gunakan produk: Folicur 430SC (Tebuconazole), Quadris (Azoxystrobin).";
                break;
            case 'Healthy':
                suggestion = "Daun jagung sehat. Tidak diperlukan tindakan.";
                break;
        }

        // Return label and suggestion
        return { label, suggestion }; 
    } catch (error) { 
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi'); 
    } 
} 

module.exports = predictClassification;

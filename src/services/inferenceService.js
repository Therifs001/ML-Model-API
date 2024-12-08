const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const classes = ['Common Rust', 'Gray Leaf Spot', 'Blight ','Healthy'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = classes[classResult];
 
        let explanation, suggestion;
 
        if(label === 'Common Rust') {
            explanation = "Common rust pada jagung disebabkan oleh jamur Puccinia sorghi. Gejalanya berupa bintik-bintik merah kecokelatan pada permukaan atas daun dan bercak berwarna lebih terang di bawah daun. Jamur ini berkembang pesat pada kondisi lembap dan suhu moderat."
            suggestion = "Untuk mengendalikannya, lakukan rotasi tanaman, pilih varietas jagung tahan penyakit, gunakan fungisida yang tepat, dan buang daun yang terinfeksi."
        }
 
        if(label === 'Gray Leaf Spot') {
            explanation = "Gray Leaf Spot disebabkan oleh jamur Cercospora zeae-maydis. Penyakit ini muncul sebagai bercak-bercak kecil berwarna abu-abu kecokelatan dengan tepian berwarna kuning pada daun jagung. Bercak ini dapat berkembang dan meluas, menyebabkan daun menjadi kering dan mati, yang mengakibatkan penurunan hasil panen. Penyakit ini umumnya berkembang pada kondisi suhu hangat dan kelembapan tinggi. Jamur penyebab penyakit ini biasanya tersebar oleh angin atau percikan air hujan."
            suggestion = "Pengendalian dengan Fungisida: Gunakan fungisida yang sesuai, seperti yang mengandung bahan aktif berbasis strobilurin atau triazol, untuk mengendalikan infeksi jamur, terutama pada kondisi cuaca yang mendukung perkembangan penyakit."
        }
 
        if(label === 'Blight') {
            explanation = " Blight pada jagung adalah penyakit yang disebabkan oleh berbagai jenis patogen, baik jamur, bakteri, atau virus, yang menginfeksi tanaman jagung dan menyebabkan kerusakan pada bagian daun, batang, atau buah. Ada beberapa jenis blight yang umum ditemukan pada jagung, termasuk Northern Corn Leaf Blight (NCLB) dan Southern Corn Leaf Blight (SCLB), yang keduanya disebabkan oleh jamur."
            suggestion = "Pilih varietas jagung yang tahan terhadap blight, terutama yang tahan terhadap jenis-jenis jamur penyebab NCLB dan SCLB. Banyak perusahaan benih kini menyediakan varietas yang telah dikembangkan untuk tahan terhadap penyakit ini."
        
        }
        if(label === 'Healthy') {
            explanation = "Kesehatan tanaman jagung mengacu pada kondisi tanaman yang bebas dari penyakit, hama, dan stres yang dapat menghambat pertumbuhannya, serta memiliki kemampuan untuk menghasilkan hasil panen yang optimal. Tanaman jagung yang sehat memiliki daun yang hijau dan subur, batang yang kokoh, serta biji yang berkualitas. Faktor-faktor yang mempengaruhi kesehatan tanaman jagung meliputi kondisi tanah, ketersediaan air, cuaca, serta pengelolaan tanaman yang baik."
            suggestion = "Gunakan pestisida alami atau kimiawi yang tepat untuk mengendalikan hama seperti ulat jagung, kutu daun, atau tikus. Pastikan menggunakan pestisida sesuai dengan dosis yang dianjurkan."
        
        }
 
        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;
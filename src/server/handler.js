const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

<<<<<<< HEAD
// Fungsi untuk menangani permintaan prediksi
=======
>>>>>>> a358005300816fd1021b9613893ce63002d90a59
async function postPredictHandler(request, h) {
    // Ekstrak payload dan model dari request
    const { image } = request.payload;
    const { model } = request.server.app;

    // Prediksi menggunakan model
    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);

    // Membuat ID unik untuk hasil prediksi
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Data yang akan disimpan
    const data = {
        id,
        result: label,
        explanation,
        suggestion,
        confidenceScore,
        createdAt,
    };

<<<<<<< HEAD
    await storeData(id, data);
    return h
      .response({
        status: 'success',
        message:
          resultScore > 99
            ? 'Model is predicted successfully.'
            : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data,
      })
      .code(201);
  }
  
  async function getPredictHistories(request, h) {
    const histories = (await predictionsCollection.get()).docs.map((doc) =>
      doc.data()
    );
    const data = histories.map((item) => ({
      id: item.id,
      history: item,
    }));
    return h.response({ status: 'success', data }).code(200);
  }
  
  export default { postPredict, getPredictHistories };
  
=======
    // Simpan data hasil prediksi
    await storeData(id, data);

    // Respon sukses
    const response = h.response({
        status: 'success',
        message:
            confidenceScore > 99
                ? 'Model is predicted successfully.'
                : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data,
    });
    response.code(201);
    return response;
}

module.exports = postPredictHandler;
>>>>>>> a358005300816fd1021b9613893ce63002d90a59

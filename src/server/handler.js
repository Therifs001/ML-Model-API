const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

// Fungsi untuk menangani permintaan prediksi
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
  

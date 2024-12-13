// Memuat konfigurasi dari file .env
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

// Menjalankan server secara asinkron
(async () => {
    const server = Hapi.server({
      port: 3001,
      host: '0.0.0.0',
      routes: {
        cors: {
          origin: ['*'],
        },
        payload: {
          maxBytes: 1000000, // Menetapkan batas maksimum ukuran payload
        },
      },
    });

    // Memuat model untuk prediksi dan menyimpannya dalam objek aplikasi server
    const model = await loadModel();
    server.app.model = model;
  
    // Menetapkan rute-rute yang telah didefinisikan
    server.route(routes);
  
    // Menangani respons server sebelum dikirimkan
    server.ext('onPreResponse', function (request, h) {
      const response = request.response;
  
      // Menangani kesalahan yang berasal dari InputError
      if (response instanceof InputError) {
        const newResponse = h.response({
          status: 'fail',
          message: `Terjadi kesalahan dalam melakukan prediksi`,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
  
      // Menangani kesalahan umum yang terjadi (Boom errors)
      if (response.isBoom) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.output.statusCode);
        return newResponse;
      }
  
      // Menangani kasus ketika ukuran payload melebihi batas maksimum
      if (request.payload && request.payload.length > 1000000) { // Pesan kesalahan untuk payload terlalu besar
        const newResponse = h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000',
        });
        newResponse.code(413); // Mengatur kode status 413 (Payload Too Large)
        return newResponse;
      }
  
      // Menangani kesalahan dengan kode status 400
      if (response.statusCode === 400) {
        const newResponse = h.response({
          status: 'fail',
          message: 'Terjadi kesalahan dalam melakukan prediksi',
        });
        newResponse.code(400);
        return newResponse;
      }
  
      // Melanjutkan proses jika tidak ada error
      return h.continue;
    });
  
    // Memulai server dan mencetak informasi server
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
  })();
  
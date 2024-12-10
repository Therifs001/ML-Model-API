# Gunakan Node.js versi 16, karena aplikasi membutuhkan versi >=16 <18
FROM node:16

# Tentukan working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber ke dalam container
COPY . .

# Ekspos port yang digunakan oleh aplikasi (sesuai dengan konfigurasi Hapi.js, biasanya 8080)
EXPOSE 8080

# Tentukan command untuk menjalankan aplikasi
CMD ["npm", "start"]

FROM node:18.17.1 
WORKDIR /app 
ENV PORT=8080 
ENV MODEL_URL='https://storage.googleapis.com/model-graph/tmp_js/model.json' 
COPY . . 
RUN npm install 
EXPOSE 8080
<<<<<<< HEAD
CMD [ "npm", "run", "start"]
=======
CMD [ "npm", "run", "start"]
>>>>>>> a358005300816fd1021b9613893ce63002d90a59

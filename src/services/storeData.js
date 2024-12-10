const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();
 
  const collection = db.collection('corn_disease_predictions');
    await collection.doc(id).set(data);
}
 
module.exports = storeData;
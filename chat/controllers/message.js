const mdbconn = require('../lib/utils/mongo.js');

function getMessages() {
    return mdbconn.conn().then((client) => {
      return client.db('chat').collection('messages').find({}).toArray();
    });
  }

  function insertMessage(message) {
    return mdbconn.conn().then((client) => {
      return client.db('chat').collection('messages').insertOne(message);
    });
  }

  function getMessage(ts) {
    return mdbconn.conn().then((client => {
      return client.db('chat').collection('messages').findOne({ts: ts});
    }));
  }

  function deleteMessage(ts) {
    return mdbconn.conn().then((client => {
      return client.db('chat').collection('messages').deleteOne({ts: ts});
    }));
  }

  function updateMessage(mensaje) {
    return mdbconn.conn().then((client => {
      return client.db('chat').collection('mensajes').updateOne({ts: mensaje.ts}, {$set : { author: mensaje.author, message: mensaje.message}});
    }));
  }

  module.exports = [getMessages, insertMessage, getMessage, deleteMessage, updateMessage];
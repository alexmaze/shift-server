import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/cdi_shift');

export let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongodb opened!');
});

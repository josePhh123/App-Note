const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/notes-db-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true // Se recomienda agregar esta opción

})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
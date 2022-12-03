const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Linki park'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del silencio'));
bands.addBand(new Band('Metallica'));

console.log(bands);
// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
    client.on('vote-band', function (mensaje) {
        bands.voteBand(mensaje.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('add-band', function (mensaje) {
        const newBand = new Band(mensaje.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', function (mensaje) {
        bands.deleteBand(mensaje.id);
        io.emit('active-bands', bands.getBands());
    });
});

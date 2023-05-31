const supertest  = require('supertest')
const {app, server} = require('../../index');
const { default: mongoose } = require('mongoose');

const api = supertest(app)

describe('Pruebas en el controllador IronSalida', () => {
    test('ironsalida retorna un json', () => {
        api
        .get('/api/ironsalida/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    });
});

afterAll( () =>{
    mongoose.connection.close()
    server.close()
})
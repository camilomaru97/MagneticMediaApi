const supertest = require('supertest')
const { app, server } = require('../../index');
const { default: mongoose } = require('mongoose');

const api = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDc2ODY3ZjZkOTA2NzA2ZDgzY2Y2MDEiLCJuYW1lIjoiQ2FtaWxvIiwiaWF0IjoxNjg2MDIyMDQwLCJleHAiOjE2ODYwMjkyNDB9.rYZW5o63VQDWIr_DcofrYyWd3Xze8N6XLt8D3wWj6Ng'


const newIronLlegada = {
    "tipo_transporte": "3774",
    "destino": "Bogota",
    "ubicacion": "Calle 59",
    "numero_remision": new Date().getTime(),
    "codigo_medio": "123ABC45"
}

const newIronLlegadaError = {
    "tipo_transporte": "3774",
    "destino": "Bogota",
    "ubicacion": "Calle 59",
    "codigo_medio": "123ABC45"
}

describe('Pruebas en el controllador IronLlegada', () => {

    test('IronLlegada retorna un json', () => {
        api
            .get('/api/ironsalida/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Debe de crear un nuevo objeto de iron llegada', async () => {
        const response = await api
            .post('/api/ironllegada/')
            .set('x-token', token)
            .send(newIronLlegada)
            .expect(200)
        expect(response.body.ok).toBe(true)
    })

    test('No debe de crear un nuevo objeto de iron llegada si faltan campos', async () => {
        const response = await api
            .post('/api/ironllegada/')
            .set('x-token', token)
            .send(newIronLlegadaError)
            .expect(400)
        expect(response.body.ok).toBe(false)
    })

    test('Debe de devolver un array con los objetos de iron llegada', async () => {
        const response = await api.get('/api/ironllegada/')
            .set('x-token', token)
            .expect(200)
    })

    test('No debe de eliminar un iron llegada si no tiene un id valido', async () => {
        const idIronLlegada = '647e52f0bf2e9afc74af9c55'
        const response = await api.delete(`/api/ironllegada/${idIronLlegada}`)
            .set('x-token', token)
            .expect(404)

        expect(response.body.ok).toBe(false)
    })

    test('No debe de actualizar un iron llegada si no tiene un id valido', async () => {
        const idIronLlegada = '647e52f0bf2e9afc74af9c55'
        const response = await api.put(`/api/ironllegada/${idIronLlegada}`)
            .set('x-token', token)
            .expect(400)

        expect(response.body.ok).toBe(false)
    })

});

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
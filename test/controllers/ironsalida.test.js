const supertest = require('supertest')
const { app, server } = require('../../index');
const { default: mongoose } = require('mongoose');

const api = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDc2ODY3ZjZkOTA2NzA2ZDgzY2Y2MDEiLCJuYW1lIjoiQ2FtaWxvIiwiaWF0IjoxNjg2MDIyMDQwLCJleHAiOjE2ODYwMjkyNDB9.rYZW5o63VQDWIr_DcofrYyWd3Xze8N6XLt8D3wWj6Ng'


const newIronSalida = {
    "fecha_salida": 300000000000,
    "fecha_devolucion": 512325232344,
    "destino": "Bogota",
    "ubicacion": "Bogota",
    "numero_remision": new Date().getTime(),
    "codigo_medio": "12345671"
}

const newIronSalidaError = {
    "fecha_salida": 300000000000,
    "fecha_devolucion": 512325232344,
    "numero_remision": new Date().getTime(),
    "codigo_medio": "12345671"
}

describe('Pruebas en el controllador IronSalida', () => {

    test('ironsalida retorna un json', () => {
        api
            .get('/api/ironsalida/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Debe de crear un nuevo objeto de iron salida', async () => {
        const response = await api
            .post('/api/ironsalida/')
            .set('x-token', token)
            .send(newIronSalida)
            .expect(200)
        expect(response.body.ok).toBe(true)
    })

    test('No debe de crear un nuevo objeto de iron salida si faltan campos', async () => {
        const response = await api
            .post('/api/ironsalida/')
            .set('x-token', token)
            .send(newIronSalidaError)
            .expect(400)
        expect(response.body.ok).toBe(false)
    })

    test('Debe de devolver un array con los objetos de iron salida', async () => {
        const response = await api.get('/api/ironsalida/')
            .set('x-token', token)
            .expect(200)
    })

    test('No debe de eliminar un iron salida si no tiene un id valido', async () => {
        const idIronSalida = '647e52f0bf2e9afc74af9c55'
        const response = await api.delete(`/api/ironsalida/${idIronSalida}`)
            .set('x-token', token)
            .expect(401)

        expect(response.body.ok).toBe(false)
    })

    test('No debe de actualizar un iron salida si no tiene un id valido', async () => {
        const idIronSalida = '647e52f0bf2e9afc74af9c55'
        const response = await api.put(`/api/ironsalida/${idIronSalida}`)
            .set('x-token', token)
            .expect(400)

        expect(response.body.ok).toBe(false)
    })

});

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
const supertest = require('supertest')
const { app, server } = require('../../index');
const { default: mongoose } = require('mongoose');

const api = supertest(app)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDc2ODY3ZjZkOTA2NzA2ZDgzY2Y2MDEiLCJuYW1lIjoiQ2FtaWxvIiwiaWF0IjoxNjg2MDIyMDQwLCJleHAiOjE2ODYwMjkyNDB9.rYZW5o63VQDWIr_DcofrYyWd3Xze8N6XLt8D3wWj6Ng'

const fakeData = toString(new Date().getTime * 6)

const newCatalogo = {
    "numero_ip": "123.145.121.567",
    "nombre_servidor": fakeData,
    "nombre_catalogo": fakeData,
    "consola": "Zona Franca",
    "ciclo": "Diario",
    "programa": "Dataprotector",
    "tecnologia": "LT06"
}

const newCatalogoError = {
    "numero_ip": "123.145.124.567",
    "nombre_servidor": "servidor1234567",
    "nombre_catalogo": "ABCD123123DDVF1231",
    "tecnologia": "LT06"
}

describe('Pruebas en el controllador catalogo', () => {

    test('ironsalida retorna un json', () => {
        api
            .get('/api/catalogo')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Debe de crear un nuevo objeto de catalogo', async () => {
        const response = await api
            .post('/api/catalogo')
            .set('x-token', token)
            .send(newCatalogo)
            .expect(200)
        expect(response.body.ok).toBe(true)
    })

    test('No debe de crear un nuevo objeto de catalogo si faltan campos', async () => {
        const response = await api
            .post('/api/catalogo')
            .set('x-token', token)
            .send(newCatalogoError)
            .expect(400)
        expect(response.body.ok).toBe(false)
    })

    test('Debe de devolver un array con los objetos de catalogo', async () => {
        const response = await api.get('/api/catalogo')
            .set('x-token', token)
            .expect(200)
    })

    test('No debe de eliminar un catalogo si no tiene un id valido', async () => {
        const idCatalogo = '647e52f0bf2e9afc74af9c55'
        const response = await api.delete(`/api/catalogo/${idCatalogo}`)
            .set('x-token', token)
            .expect(404)

        expect(response.body.ok).toBe(false)
    })

    test('No debe de actualizar un catalogo si no tiene un id valido', async () => {
        const idCatalogo = '647e52f0bf2e9afc74af9c55'
        const response = await api.put(`/api/ironsalida/${idCatalogo}`)
            .set('x-token', token)
            .expect(400)

        expect(response.body.ok).toBe(false)
    })

});

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
const path = require('path')

const swaggerSpecification = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Magnetic Media API",
            version: "1.0.0"
        },
        servers: [{
            url:`http://localhost:${process.env.PORT}`
        }]
    },
    apis: [
        `${path.join(__dirname, '../routes/*.js')}`
    ]
}

module.exports = swaggerSpecification;
import videoSwagger from "./video.swagger.js"

const swaggerDocument = {
    openapi: "3.1.0",
    info: {
        title: "Documentation Cyber Media API",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3069",
            description: "Local Server",
        },
        {
            url: "http://thanhlucifer.id.vn",
            description: "Production Server",
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },

    paths: {
        ...videoSwagger
    }
}

export default swaggerDocument
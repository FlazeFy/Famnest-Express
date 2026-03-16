import swaggerJsdoc from "swagger-jsdoc"
import { OpenAPIV3 } from "openapi-types"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Famnest Express API",
            version: "1.0.0",
            description: "API documentation for Famnest",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        paths: {},
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    } as OpenAPIV3.Document,
    apis: ["./src/routes/**/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)
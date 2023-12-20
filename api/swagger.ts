const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Artiz MoNo API",
  },
  host: "localhost:4000",
  basePath: "/api",
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routers/*.ts"];

swaggerAutogen(outputFile, routes, doc);
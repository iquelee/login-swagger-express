const express = require("express");
const path              = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const basicAuth = require("express-basic-auth");
const { router } = require("./routes/app.routes");

//创建服务器
const app = express();
app.use(express.json());

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "My apis in swaager",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8083",
      },
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};


const swaggerSpecs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api", router);

//定义路由
const user = require("./routes/app.routes")


app.use("/api", router);


// POST参数接受 中间件（固定写法）
app.use(express.urlencoded({extended:false}))



app.listen(8083, () => console.log(`Server is running on port 8083`));

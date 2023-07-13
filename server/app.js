const express = require("express");
const session = require('express-session')
const connectDB = require("./config/db");
const logger = require("./lib/logger");
const app = express();
const { exec } = require("child_process");
var PropertiesReader = require("properties-reader");
var properties = PropertiesReader("config/app.properties");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

connectDB();

//const userRoutes= require("./routes/userroutes");
app.use(express.json()); //This is used in order for req.body.abc statemnets to work fine.
let cors = require("cors");
app.use(cors());
app.use(session({ secret: 'Secret_Key' }));
require("dotenv").config();

const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "System apis",
            version: "1.0.0",
            description: "Apis for managing the blockchain system",
        },
        servers: [
            {
                url: `http://${properties.get("server.ip")}:5002`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header",
                },
            },
        },

        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                scheme: "bearer",
                in: "header",
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.post("/deployMintNFTERC721", (req, res) => {
    console.log(req.body);
    const NFT_NAME = req.body.NFT_NAME;
    const NFT_SYMBOL = req.body.NFT_SYMBOL;
    const PRICEOFNFT = req.body.PRICEOFNFT;
    const network = req.body.network;
    exec(
      `sh deploy.sh ${NFT_NAME} ${NFT_SYMBOL} ${PRICEOFNFT}  ${network}`,
      // exec(`sh deploy.sh`,
      (error, stdout, stderr) => {
        console.log(stdout);
        let response = JSON.parse(stdout);
        console.log(stderr);
        res.json(response);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      }
    );
  });

// const enrollmentRoutes = require("./routes/EnrollmentRoute.js");
// app.use("/enrollment", enrollmentRoutes);

// const credentialsRoutes = require("./routes/CredentialsRoute.js");
// app.use("/credentials", credentialsRoutes);

// const projectRoutes = require("./routes/ProjectRoute.js");
// app.use("/projects", projectRoutes);

// const MarketPlaceRoute = require("./routes/MarketPlaceRoute.js");
// app.use("/marketPlace", MarketPlaceRoute);

app.listen(5002, () => {
    logger.info("app is listening on port 5002");
});

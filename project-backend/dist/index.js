"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const images_1 = require("./routes/images");
const auth_1 = require("./routes/auth");
const auth_2 = require("./routes/auth");
async function setUpServer() {
    dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
    const PORT = process.env.PORT || 3000;
    const staticDir = process.env.STATIC_DIR || "public";
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME, IMAGE_UPLOAD_DIR } = process.env;
    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
    console.log("Attempting Mongo connection at " + connectionStringRedacted);
    const mongoClient = await mongodb_1.MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    const app = (0, express_1.default)();
    const path = require('path');
    app.use(express_1.default.static(staticDir));
    if (IMAGE_UPLOAD_DIR) {
        app.use("/uploads", express_1.default.static(IMAGE_UPLOAD_DIR));
    }
    app.get("/hello", (req, res) => {
        res.send("Hello, World");
    });
    (0, auth_1.registerAuthRoutes)(app, mongoClient);
    app.use("/api/*", auth_2.verifyAuthToken);
    (0, images_1.registerImageRoutes)(app, mongoClient);
    // KEEP THIS AT THE VERY BOTTOM TO ONLY CATCH ROUTES THAT WEREN'T ALR CAUGHT
    app.get("*", (req, res) => {
        console.log("none of the routes above me were matched: ", req.path);
        // Set root in options so we can send relative path in res.sendFile
        const options = {
            root: staticDir,
        };
        if (req.path.startsWith("/images") || req.path == "/account") {
            res.sendFile("index.html", options, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                }
                else {
                    console.log('Sent:', req.path);
                }
            });
        }
    });
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
setUpServer();

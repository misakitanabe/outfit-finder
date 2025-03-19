"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImageRoutes = registerImageRoutes;
const express_1 = __importDefault(require("express"));
const ImageProvider_1 = require("../ImageProvider");
function registerImageRoutes(app, mongoClient) {
    app.use(express_1.default.json());
    app.get("/api/images", (req, res) => {
        let userId = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }
        const i = new ImageProvider_1.ImageProvider(mongoClient);
        i.getAllImages(userId)
            .then((response) => {
            res.send(response);
        })
            .catch((err) => {
            console.error(`error fetching images: ${err}`);
        });
    });
    app.patch("/api/images/:id", (req, res) => {
        let imageId = req.params.id;
        let newName = req.body.name;
        if (!newName) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
        }
        else if (newName.length > 200) {
            res.status(400).send({
                error: "Bad request",
                message: "Name property is too long. Please enter a name under 200 characters"
            });
        }
        console.log(`imageID: ${imageId}`);
        const i = new ImageProvider_1.ImageProvider(mongoClient);
        i.updateImageName(imageId, newName)
            .then((response) => {
            console.log(`response: ${response}`);
            if (response === 0) {
                res.status(404).send({
                    error: "Not found",
                    message: "Image does not exist"
                });
            }
            res.status(204).send();
        })
            .catch((err) => {
            console.error(`error fetching images: ${err}`);
        });
    });
}

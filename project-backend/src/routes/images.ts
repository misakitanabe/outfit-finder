import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.use(express.json());

    app.get("/api/images", (req: Request, res: Response) => {
        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }

        const i = new ImageProvider(mongoClient);
        i.getAllImages(userId)
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                console.error(`error fetching images: ${err}`);
            });
    });

    app.patch("/api/images/:id", (req: Request, res: Response) => {
        let imageId: string | undefined = req.params.id;
        let newName: string = req.body.name;
        if (!newName) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
        } else if (newName.length > 200) {
            res.status(400).send({
                error: "Bad request",
                message: "Name property is too long. Please enter a name under 200 characters"
            });
        }
        console.log(`imageID: ${imageId}`);
        const i = new ImageProvider(mongoClient);
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProvider = void 0;
class ImageProvider {
    mongoClient;
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }
    async getAllImages(authorId) {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const collection = this.mongoClient.db().collection(collectionName); // TODO #1
        // MongoDB Aggregation to join and denormalize author field
        const pipeline = [];
        if (authorId) {
            pipeline.push({
                $match: { author: authorId }
            });
        }
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authorDetails",
            },
        }, { $unwind: "$authorDetails" }, {
            $project: {
                _id: 1,
                src: 1,
                name: 1,
                likes: 1,
                author: {
                    name: "$authorDetails.name",
                    email: "$authorDetails.email",
                    profilePicture: "$authorDetails.profilePicture",
                },
            },
        });
        const normalizedImages = await collection
            .find()
            .toArray();
        return normalizedImages;
    }
    async updateImageName(imageId, newName) {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const imageCollection = this.mongoClient.db().collection(imageCollectionName);
        const res = await imageCollection.updateOne({ _id: imageId }, { $set: { name: newName } });
        return res.matchedCount;
    }
    async createImage(_id, src, name, favorited, category, color, author) {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const imageCollection = this.mongoClient.db().collection(imageCollectionName);
        // Create the document
        const newImage = {
            _id: _id,
            src: src,
            name: name,
            favorited: favorited,
            author: author,
            category: category,
            color: color,
        };
        try {
            const res = await imageCollection.insertOne(newImage);
            return newImage;
        }
        catch (err) {
            throw new Error("Creating image metadata in DB failed");
        }
    }
}
exports.ImageProvider = ImageProvider;

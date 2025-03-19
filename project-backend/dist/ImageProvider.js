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
        const denormalizedImages = await collection
            .aggregate(pipeline)
            .toArray();
        return denormalizedImages;
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
}
exports.ImageProvider = ImageProvider;

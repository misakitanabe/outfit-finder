"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class CredentialsProvider {
    collection;
    constructor(mongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection(COLLECTION_NAME);
    }
    async registerUser(username, plaintextPassword) {
        const exists = await this.collection.findOne({ 'username': username });
        // if user already exists, return false
        if (exists) {
            return false;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(plaintextPassword, salt);
        // console.log(`salt: ${salt}`);
        // console.log(`hash: ${hash}`);
        // Define user object
        const newUser = {
            username: username,
            password: hash,
            createdAt: new Date()
        };
        // Insert the user
        const result = await this.collection.insertOne(newUser);
        console.log("User created with ID:", result.insertedId);
        // Wait for any DB operations to finish before returning!
        return true;
    }
    async verifyPassword(username, plaintextPassword) {
        const user = await this.collection.findOne({ username: username }, { projection: { password: 1, _id: 0 } } // Exclude _id and return only password
        );
        if (!user) {
            console.log('User not found.');
            return false;
        }
        const hashedDatabasePassword = user.password;
        const match = await bcrypt_1.default.compare(plaintextPassword, hashedDatabasePassword);
        if (match) {
            console.log('Password is correct!');
        }
        else {
            console.log('Wrong pass');
        }
        return match;
    }
}
exports.CredentialsProvider = CredentialsProvider;

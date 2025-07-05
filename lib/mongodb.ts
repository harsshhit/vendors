import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
  var _mongooseConnection: Promise<typeof mongoose>;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// MongoDB client for NextAuth
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Mongoose connection function
export async function dbConnect() {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongooseConnection) {
      global._mongooseConnection = mongoose.connect(uri);
    }
    return global._mongooseConnection;
  } else {
    return mongoose.connect(uri);
  }
}

export default clientPromise;

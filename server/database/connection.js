import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

await client.connect();

//Creates the collection named dorm
const dormDB = client.db("dorm");


export default {
    residents: dormDB.collection("residents"),
    assortment: dormDB.collection("assortment"),
    tasks: dormDB.collection("tasks"),
    laundry: dormDB.collection("laundry")
};
import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";


export default async function handler(req, res) {

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const data = await db.collection('orders').find({}).toArray()
        res.status(200).json({message: 'Sukses mengambil data orders', data})
    }

    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { orderId, valNote, valStatus } = req.body

        await db.collection('orders').updateOne({"_id": ObjectId(orderId)}, { 
            $set: { "status" : valStatus, "admin_note": valNote }
        })
        res.status(200).json({message: 'Sukses edit order'})
    }
}
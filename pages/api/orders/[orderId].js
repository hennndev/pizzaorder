import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'


export default async function handler(req, res) {

    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { orderId } = req.query
        const newOrder = {
            orderPada: new Date(),
            user_id: orderId,
            ...req.body
        }
        await db.collection('orders').insertOne(newOrder)
        res.status(201).json({message: 'Sukses order'})
    }

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const { orderId } = req.query
        const data = await db.collection('orders').find({"user_id": orderId}).toArray()
        res.status(200).json({message: 'Sukses mengambil data spesifik order', data})
    }

    if(req.method === 'DELETE') {
        const client = await clientPromise
        const db = client.db()
        const { orderId } = req.query
        await db.collection('orders').remove({_id: ObjectId(orderId)})
        res.status(200).json({message: 'Sukses menghapus order history'})
    }
}
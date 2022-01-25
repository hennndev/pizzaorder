
import clientPromise from "lib/mongodb";

export default async function handler(req, res) {
    
    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()

        const data = await db.collection('products').find({}).toArray()
        res.status(200).json({message: 'Sukses mengambil products', data})
    }
    
    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const newProduct = {
            ...req.body,
            diunggahPada: new Date(),
            status: 'tersedia'
        }
        await db.collection('products').insertOne(newProduct)
        res.status(201).json({message: 'Sukses menambahkan produk baru'})
    }

}
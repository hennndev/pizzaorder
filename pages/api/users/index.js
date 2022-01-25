import clientPromise from "lib/mongodb";

export default async function handler(req, res) {

    if(req.method === 'GET') {
        const client = await clientPromise
        const db = client.db()
        const data = await db.collection('users').find({}).toArray()
        res.status(200).json({message: 'Sukses mengambil data pelanggan', data})
    }
}
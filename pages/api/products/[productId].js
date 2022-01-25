import clientPromise from "lib/mongodb";
const cloudinary = require('cloudinary').v2
import { ObjectId } from "mongodb";


export default async function handler(req, res) {
    
    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const {oldImageId = null, ...data} = req.body
        const { productId } = req.query

        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET 
        });

        if(oldImageId) {
            cloudinary.uploader.destroy(oldImageId, function(error, result) { })
        }
        await db.collection('products').replaceOne({"_id": ObjectId(productId)}, {...data})
        res.status(200).json({message: 'Sukses edit produk'})
    }

    if(req.method === 'DELETE') {
        const client = await clientPromise
        const db = client.db()
        const { productId, gambarId } = req.query

        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET 
        });
        cloudinary.uploader.destroy(gambarId, function(error, result) { })
        await db.collection('products').remove({_id: ObjectId(productId)})
        res.status(200).json({message: 'Sukses edit produk'})
    }
}
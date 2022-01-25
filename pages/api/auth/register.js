import clientPromise from "lib/mongodb";
import { hash, genSalt } from 'bcryptjs'


export default async function handler(req, res) {
    
    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { username, email, password } = req.body
        
        
        const checkExistingUser = await db.collection('users').findOne({email: email})

        if(checkExistingUser) {
            res.status(422).send('Email sudah dipakai')
        } else {
            const salt = await genSalt(10)
            const newUser = {
                createdAt: new Date(),
                username,
                email, 
                password: await hash(password, salt)
            }
            await db.collection('users').insertOne(newUser)
            res.status(201).json({message: 'Sukses membuat akun'})
        }
    }
}
import { NextResponse } from "next/server"

export default async function middleware(req, res) {
    
    const { user } = req.cookies
    
    const path = req.page.name

    if(path === '/signin') {
        if(user) {
            return NextResponse.redirect('/')
        }
    }
    if(path === '/orders' || path === '/notifications') {
        if(user && JSON.parse(user)?.email.includes('admin') || !user) {
            return NextResponse.redirect('/')
        }
    } 
    if(path === '/cart') {
        if(user && JSON.parse(user)?.email.includes('admin')) {
            return NextResponse.redirect('/')
        }
    }
    if(path === '/admin/products' || path === '/admin/orders' || path === '/admin/add-product' || path === '/admin/update-product' || path === '/admin/users') {
        if(user && !JSON.parse(user)?.email.includes('admin') || !user) {
            return NextResponse.redirect('/')
        }
    }
}
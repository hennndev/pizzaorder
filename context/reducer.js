export const initState = {
    cart: [],
    produkEdit: null
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_CART' : 
            let updateCart = [...state.cart]    
            const existItem = updateCart.find(item => item._id === action.payload._id)
            if(!existItem) updateCart = [...state.cart, {...action.payload, count: 1}]
            return {
                ...state,
                cart: updateCart
            }
        case 'INCREMENT_CART' :
            let updateIncCart = [...state.cart]
            const existIncItem = updateIncCart.find(item => item._id === action.payload._id)
            const idxIncItem = updateIncCart.indexOf(existIncItem)
            
            if(existIncItem.count === 20) {
                existIncItem.count = 20
            } else {
                existIncItem.count++
            }
            updateIncCart[idxIncItem] = existIncItem
            return {
                ...state,
                cart: updateIncCart
            }
        case 'DECREMENT_CART': {
            let updateDecCart = [...state.cart]
            const existDecItem = updateDecCart.find(item => item._id === action.payload._id)
            const idxDecItem = updateDecCart.indexOf(existDecItem)
            if(existDecItem.count === 1) {
                existDecItem.count = 1
            } else {
                existDecItem.count--
            }
            updateDecCart[idxDecItem] = existDecItem
            return {
                ...state,
                cart: updateDecCart
            }
        }
        case 'ADD_NOTE' :
            let updateNoteCart = [...state.cart]
            const existNoteItem = updateNoteCart.find(item => item._id === action.payload._id)
            const idxNoteItem = updateNoteCart.indexOf(existNoteItem)
            updateNoteCart[idxNoteItem] = action.payload
            return {
                ...state,
                cart: updateNoteCart
            }
        case 'DELETE_CART' :
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== action.payload._id)
            }
        case 'CLEAR_CART' :
            return {
                ...state,
                cart: action.payload
            }
        case 'EDIT_PRODUK' : 
            return {
                ...state,
                produkEdit: action.payload
            }
        default: 
            return state
    }
}
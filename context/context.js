import { createContext, useContext, useReducer } from "react";
import { reducer, initState } from "./reducer";

const Context = createContext()

const Provider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initState)

    const handleEditProduk = (data) => dispatch({type: 'EDIT_PRODUK', payload: data})
    const handleAddCart = (item) => dispatch({type: 'ADD_CART', payload: item})
    const handleIncrement = (item) => dispatch({type: 'INCREMENT_CART', payload: item})
    const handleDecrement = (item) => dispatch({type: 'DECREMENT_CART', payload: item})
    const handleDeleteCart = (item) => dispatch({type: 'DELETE_CART', payload: item})
    const handleAddNote = (item) => dispatch({type: 'ADD_NOTE', payload: item})

    const handleClearCart = () => dispatch({type: 'CLEAR_CART', payload: []})
   
    return (
        <Context.Provider value={{
            ...state,
            handleAddCart,
            handleEditProduk,
            handleDeleteCart,
            handleIncrement,
            handleDecrement,
            handleClearCart,
            handleAddNote
        }}>
            {children}
        </Context.Provider>
    )
}

const useData = () => useContext(Context)

export { Provider, useData }
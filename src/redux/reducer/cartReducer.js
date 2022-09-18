const INITIAL_STATE = {
    cart: []
}

export default function cartReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case "ADDITEM":

        const indexItemAdd = state.cart.findIndex(obj => obj.id === action.payload.id);

        // Si l'item est déjà présent dans le state (store)
        if (indexItemAdd !== -1) {
            const updatedQuantity = {
                ...state.cart[indexItemAdd],
                quantity: state.cart[indexItemAdd].quantity + action.payload.quantity
            };
            const newArr = [...state.cart];
            // On remplace l'ancien élément par le même élément avec la nouvelle quantité
            newArr.splice(indexItemAdd, 1, updatedQuantity);
            return {
                cart: newArr,
            }
        }
        else {
            // Sinon on push l'élément normalement (pas de risque de doublon)
            const newArr = [...state.cart];
            newArr.push(action.payload);
            return {
                cart: newArr,
            }
        }

        case "UPDATEITEM":

        const indexItemUpdate = state.cart.findIndex(obj => obj.id === action.payload.id);

        const newArrUpdated = [...state.cart];
        // On remplace l'ancien élément par le même élément avec la nouvelle quantité (payload du handleChange de ShoppingCart.js)
        newArrUpdated.splice(indexItemUpdate, 1, action.payload);
        return {
            cart: newArrUpdated,
        }

        case "DELETEITEM":

        const indexItemDelete = state.cart.findIndex(obj => obj.id === action.payload.id);

        const newArrDeleted = [...state.cart];
        // On splice l'ancien élément en le remplaçant par du vide, il n'existe donc plus 
        newArrDeleted.splice(indexItemDelete, 1, );
        return {
            cart: newArrDeleted,
        }
    }

    return state;

}
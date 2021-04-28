import { createReducer, on, Action } from '@ngrx/store';
import { ICart } from '../models/cart.interface';
import { IProduct } from '../models/product.interface';
import * as trigger from './store.actions'


const _cart = createReducer({} as ICart[],
    on(trigger.cart, (state, action) => state = action['cart'] ? Object.assign(action['cart']) : state));

export function cartReducer(state = [] as ICart[], action: Action){
    return _cart(state,action);
}

const _products = createReducer({} as IProduct[],
    on(trigger.products, (state, action) => state = action['products'] ? Object.assign(action['products']) : state));

export function productsReducer(state = [] as IProduct[], action: Action){
    return _products(state,action);
}
import { createReducer, on, Action } from '@ngrx/store';
import { ICart } from '../models/cart.interface';
import * as trigger from './store.actions'


const _cart = createReducer({} as ICart[],
    on(trigger.cart, (state, action) => state = action['cart'] ? Object.assign(action['cart']) : state));

export function cartReducer(state = [] as ICart[], action: Action){
    return _cart(state,action);
}
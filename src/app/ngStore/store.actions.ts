import { createAction, props } from '@ngrx/store';
import { ICart } from '../models/cart.interface';
import { IProduct } from '../models/product.interface';

export const cart = createAction('[Cart Component] Cart', props<{cart: ICart[]}>());

export const products = createAction('[Products Component] Products', props<{products: IProduct[]}>());
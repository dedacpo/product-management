import { createAction, props } from '@ngrx/store';
import { ICart } from '../models/cart.interface';

export const cart = createAction('[Cart Component] Products', props<{cart: ICart[]}>());
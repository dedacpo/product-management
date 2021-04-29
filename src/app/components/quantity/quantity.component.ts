import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonQuantity } from 'src/app/models/buttonQuantity.interface';
import { ICart } from 'src/app/models/cart.interface';
import { cart } from 'src/app/ngStore/store.actions';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {

  constructor(private store: Store<{ cart: ICart[] }>) { }

  quantity: number = 0;

  button: ButtonQuantity = {
    name: 'add',
    disabled: true
  }

  cart: ICart[] = [];

  @Input() productId: string;

  @Input() isEditable: boolean;

  ngOnInit(): void {
    this.store.select('cart').subscribe((cart: ICart[]) => {
      this.cart = JSON.parse(JSON.stringify(cart));
      const product = this.cart.find(item => item.productId === this.productId);
      if (product) {
        this.quantity = product.quantity;
        this.button.name = 'added';
        this.button.disabled = true;
      }
    });
  }

  updateStatusButton(event?) {

    if(event && isNaN(Number(event))) return

    if(event){
      this.quantity = event;
    }    
    const product = this.cart.find(item => item.productId === this.productId); 

    if(product){
      this.button.name = 'update';
      this.button.disabled = false;
    }else {
      if(this.quantity == 0){
        this.button.disabled = true;
        return
      }
      this.button.disabled = false;
      this.button.name  = 'add';
    }   
  }

  addToCart() {
    if (this.button.disabled || this.isEditable)
      return;
    const index = this.cart.findIndex(item => item.productId === this.productId);

    this.configureCart(index);
    
    this.configureButton();
    
    this.store.dispatch(cart({ cart: this.cart }));
  }

  add() {
    if (this.isEditable)
      return;
    this.quantity += 1;
    this.updateStatusButton();
  }

  remove() {
    if (this.isEditable)
      return;
    if (this.quantity > 0) {
      this.quantity -= 1;
      this.updateStatusButton();
    }
  }

  configureCart(index: number){
    if (index > -1 ) {
      if(this.quantity == 0){
        this.cart.splice(index, 1);
      }else{
        this.cart[index].quantity = this.quantity;
      }     
    } else {
      this.cart.push({
        productId: this.productId,
        quantity: this.quantity
      } as ICart)
    }
  }

  configureButton(){
    if(this.quantity == 0){
      this.button.name = 'add';
    }else{
      this.button.name = 'added';
    }   
    this.button.disabled = true;
  }

}

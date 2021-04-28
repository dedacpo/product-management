import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from './models/product.interface';
import { ProductService } from './services/product/product.service';
import { products } from 'src/app/ngStore/store.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-management';

  clientHeight: number;

  constructor(private productService: ProductService, private store: Store<{ products: IProduct[] }>){}

  async ngOnInit(){
    const productsAPI = await this.productService.getProducts().toPromise();
    this.store.dispatch(products({ products: productsAPI}));
    this.onResized();
  }

  onResized() {
    this.clientHeight = window.innerHeight;
  }

  onActivate() {
    window.scroll(0, 0);
  }
 
}

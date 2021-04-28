import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/models/product.interface';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private store: Store<{ products: IProduct[] }>) { }

  products: IProduct[];
  filteredProducts: IProduct[];
  order

  ngOnInit() {
    this.store.select('products').subscribe((products: IProduct[]) => {
      this.products = JSON.parse(JSON.stringify(products));
      this.filteredProducts = JSON.parse(JSON.stringify(products));     
    });
  }

  searchProduct(event) {
    this.filteredProducts = [];
    const keys = Object.keys(this.products[0]);
    keys.forEach(item => {
      this.filteredProducts.push(...this.products.filter(itemFilter => {
        const dom = new DOMParser().parseFromString(itemFilter[item], 'text/html');
        return dom.lastChild.textContent.toLowerCase().includes(event.toLowerCase()) && !this.filteredProducts.filter(filter2 => filter2.id === itemFilter.id).length;
      }
      ));
    });
    this.orderProducts();
  }

  orderProducts(event?) {
    if(event)
      this.order = event;
    this.filteredProducts.sort((firstElement, secondElement) => {
      if (secondElement[this.order.field] > firstElement[this.order.field]) { return this.order.order == 'asc' ? - 1 : 1; }
      if (secondElement[this.order.field] < firstElement[this.order.field]) { return this.order.order == 'desc' ? -1 : 1; }

      return 0;
    })
  }

}

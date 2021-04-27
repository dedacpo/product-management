import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: IProduct[];

  async ngOnInit() {
    this.products = await this.productService.getProducts().toPromise();
  }

}

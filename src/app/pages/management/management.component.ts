import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/models/product.interface';
import { products } from 'src/app/ngStore/store.actions';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor(private store: Store<{ products: IProduct[] }>) { }

  products: IProduct[];

  selectedId: string;

  selectedProduct: IProduct;

  invalid = {
    imageURL:false,
    title: false,
    subtitle: false,
    value: false,
    currency: false,
    promotion: false
  };

  ngOnInit(): void {
    this.store.select('products').subscribe((products: IProduct[]) => {
      this.products = JSON.parse(JSON.stringify(products));
      this.selectedId = this.selectedId ? this.selectedId : this.products[0]?.id;
      this.selectedProduct = this.selectedProduct ? this.selectedProduct : this.products[0]
    });
  }

  drop(event: CdkDragDrop<IProduct[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    this.store.dispatch(products({ products: this.products }));
  }

  update(event:string | number, field:string) {
    if(event == ''){
      this.invalid[field] = true;
      return;
    }else{
      this.invalid[field] = false;
    }
     
    const product = this.products.find(item => item.id == this.selectedId);
    product[field] = event;
    this.store.dispatch(products({ products: this.products }));
  }

  setSelectedProduct(product:IProduct) {
    if(product.id == this.selectedId)
      return;
    this.selectedId = undefined;
    this.invalid = {
      imageURL:false,
      title: false,
      subtitle: false,
      value: false,
      currency: false,
      promotion: false
    };
    setTimeout(()=>{
      this.selectedId = product.id;
      this.selectedProduct = product;
    })
  }

  updateOrderInternal(product: IProduct){
    const productProv = this.products.find(item => item.id == product.id);
    productProv.order = product.order;
    this.store.dispatch(products({ products: this.products }));

  }

}

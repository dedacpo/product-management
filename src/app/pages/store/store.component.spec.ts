import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';

import { StoreComponent } from './store.component';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;
  let store: Store<{ products: IProduct }>

  let storeResult:IProduct[] = []

  let storeStub = {
    dispatch: () => { },
    select: () => of([])
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreComponent ],
      providers: [
        { provide: Store, useValue: storeStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    storeResult = [
      {
        "id": "modelo_negra",
        "imageURL": "./assets/images/Negra-modelo_botella.png",
        "title": "<h2>Modelo Negra</h2>",
        "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
        "value": 32,
        "currency": "USD",
        "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
        "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
      },
      {
        "id": "colorado_apia",
        "imageURL": "./assets/images/colorado-appia.png",
        "title": "<h2>Colorado Apia</h2>",
        "subtitle": "<span>16 Unit &#149; 330ml Bottle</span>",
        "value": 43,
        "currency": "USD",
        "promotion": "<span style=\"color: green;\">Buy 3, get 1 free Red Bull or 2 Pepsi Black.</span>",
        "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
      },
    ]
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find a product when a word matches with any field', () => {
    const spy = spyOn(component, 'orderProducts');
    const event = 'colorado';
    component.products = storeResult;
    component.searchProduct(event);
    expect(component.filteredProducts).toEqual([storeResult[1]]);
    expect(spy).toHaveBeenCalled();
  });

  it('should order the product in asc order by the field title', () => {
    const event = {
      field: 'title',
      order: 'asc'
    };
    component.filteredProducts = JSON.parse(JSON.stringify(storeResult));
    component.orderProducts(event);
    expect(component.filteredProducts).toEqual([storeResult[1], storeResult[0]]);
  });

  it('should order the product in desc order by the field value', () => {
    const event = {
      field: 'value',
      order: 'desc'
    };
    component.filteredProducts = JSON.parse(JSON.stringify(storeResult));
    component.orderProducts(event);
    expect(component.filteredProducts).toEqual([storeResult[1], storeResult[0]]);
  });

  it('should order the product in desc order by the field value', () => {
    component.order = {
      field: 'value',
      order: 'desc'
    };
    component.filteredProducts = JSON.parse(JSON.stringify(storeResult));
    component.orderProducts();
    expect(component.filteredProducts).toEqual([storeResult[1], storeResult[0]]);
  });

});

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';

import { ManagementComponent } from './management.component';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;
  let store: Store<{ products: IProduct }>

  let storeStub = {
    dispatch: () => { },
    select: () => of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementComponent],
      providers: [
        { provide: Store, useValue: storeStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set products from what was recovery from store and set the selectedId to the id of the first element and set selectedProduct to the first element from store', () => {
    const storeResult = [
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
    store.select = () => of(storeResult)
    component.ngOnInit();
    expect(component.products).toEqual(storeResult);
    expect(component.selectedId).toEqual('modelo_negra');
    expect(component.selectedProduct).toEqual(storeResult[0]);
  });

  it('should set products from what was recovery from store and set the selectedId to the id to the same id that was alread set and same for product', () => {
    const storeResult = [
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
    component.selectedId = "colorado_apia";
    component.selectedProduct = storeResult[1];
    store.select = () => of(storeResult)
    component.ngOnInit();
    expect(component.products).toEqual(storeResult);
    expect(component.selectedId).toEqual('colorado_apia');
    expect(component.selectedProduct).toEqual(storeResult[1]);
  });

  it('should change the order of products when drop is called', () => {
    const spy = spyOn(store, 'dispatch');
    component.products = [
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
    const event = {
      previousIndex: 0,
      currentIndex: 1,
      item: null,
      container: null,
      previousContainer: null,
      isPointerOverContainer: null,
      distance: null
    };
    const expectedResult = [
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
      {
        "id": "modelo_negra",
        "imageURL": "./assets/images/Negra-modelo_botella.png",
        "title": "<h2>Modelo Negra</h2>",
        "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
        "value": 32,
        "currency": "USD",
        "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
        "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
      }

    ]
    component.drop(event);
    expect(spy).toHaveBeenCalled();
    expect(component.products).toEqual(expectedResult);
  });

  it('should set the property value of invalid object to true', () => {
    component.invalid =  {
      imageURL:false,
      title: false,
      subtitle: false,
      value: false,
      currency: false,
      promotion: false
    }
    const event = '';
    const field = 'value';
    component.update(event, field);
    expect(component.invalid.value).toBeTruthy();
  });

  it('should set the property value of invalid object to false', () => {
    component.products = [
      {
        "id": "modelo_negra",
        "imageURL": "./assets/images/Negra-modelo_botella.png",
        "title": "<h2>Modelo Negra</h2>",
        "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
        "value": 32,
        "currency": "USD",
        "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
        "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
      }]
    component.selectedId = "modelo_negra";
    const spy = spyOn(store, 'dispatch');
    const event = 5;
    const field = 'value';
    component.update(event, field);
    expect(component.invalid.value).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('should not change the selectedId if the product passed has same id as the selectedId', () => {
    const storeResult = 
      {
        "id": "modelo_negra",
        "imageURL": "./assets/images/Negra-modelo_botella.png",
        "title": "<h2>Modelo Negra</h2>",
        "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
        "value": 32,
        "currency": "USD",
        "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
        "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
      }
    
    const product = storeResult;
    component.selectedId = "modelo_negra";
    component.setSelectedProduct(product);
    expect(component.selectedId).toEqual("modelo_negra");
  });

  it('should set selectedId to undefined first if the selectedId is different from the id of the product passed', () => {
    const storeResult = 
      {
        "id": "modelo_negra",
        "imageURL": "./assets/images/Negra-modelo_botella.png",
        "title": "<h2>Modelo Negra</h2>",
        "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
        "value": 32,
        "currency": "USD",
        "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
        "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
      }
    
    const product = storeResult;
    component.selectedId = "colorado_apia";
    component.setSelectedProduct(product);
    expect(component.selectedId).toBeUndefined();
    expect(component.invalid).toEqual(
      {
        imageURL:false,
        title: false,
        subtitle: false,
        value: false,
        currency: false,
        promotion: false
      }
    )
  });

  it('should set selectedId to the same Id of the product that was passed', fakeAsync(() => {
    component.products = [
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
    const product = 
    {
      "id": "colorado_apia",
      "imageURL": "./assets/images/colorado-appia.png",
      "title": "<h2>Colorado Apia</h2>",
      "subtitle": "<span>16 Unit &#149; 330ml Bottle</span>",
      "value": 43,
      "currency": "USD",
      "promotion": "<span style=\"color: green;\">Buy 3, get 1 free Red Bull or 2 Pepsi Black.</span>",
      "order": ["imageURL", "title", "subtitle", "value", "promotion", "details", "cart"]
    }
    component.selectedId = "modelo_negra";
    component.setSelectedProduct(product);
    tick(200);
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.selectedId).toEqual("colorado_apia");
      expect(component.selectedProduct).toEqual(product);
    })
  }));

  it('should not change the selectedId if the product passed has same id as the selectedId', () => {
    const storeResult = [
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
    const spy = spyOn(store, 'dispatch');
    component.products = storeResult;
    const product = storeResult[0];
    component.selectedId = "modelo_negra";
    component.updateOrderInternal(product);
    expect(spy).toHaveBeenCalled();
  });

});

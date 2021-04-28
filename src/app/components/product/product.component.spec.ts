import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafePipe } from 'src/app/pipes/safe.pipe';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent , SafePipe],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.data = {
      "id": "modelo_negra",
      "imageURL": "./assets/images/Negra-modelo_botella.png",
      "title": "<h2>Modelo Negra</h2>",
      "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
      "value": 32,
      "currency": "USD",
      "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
      "order":["imageURL","title","subtitle","value","promotion", "details","cart"]
    }
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onUpdateOrderInternal event when drop method is called', () => {
    const spy = spyOn(component.onUpdateOrderInternal, 'emit');
    const event = {
      previousIndex: 0,
      currentIndex: 1,
      item: null,
      container: null,
      previousContainer:null,
      isPointerOverContainer: null,
      distance: null
    };
    const expectedResult =  {
      "id": "modelo_negra",
      "imageURL": "./assets/images/Negra-modelo_botella.png",
      "title": "<h2>Modelo Negra</h2>",
      "subtitle": "<span>12 Unit &#149; 33oz Bottle</span>",
      "value": 32,
      "currency": "USD",
      "promotion": "<span style=\"color: green;\">Buy 3, get 1 free</span>",
      "order":["title", "imageURL","subtitle","value","promotion", "details","cart"]
    }
    component.drop(event);
    expect(spy).toHaveBeenCalledWith(expectedResult);
  });
});

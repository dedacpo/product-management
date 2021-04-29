import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ICart } from 'src/app/models/cart.interface';

import { QuantityComponent } from './quantity.component';

describe('QuantityComponent', () => {
  let component: QuantityComponent;
  let fixture: ComponentFixture<QuantityComponent>;
  let store: Store<{ cart: ICart}>

  let storeStub = {
    dispatch: () => { },
    select: () => of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityComponent ],
      providers: [
        { provide: Store, useValue: storeStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set quantity and button information according to what is on the cart', () => {
    component.productId = 'product_fake';
    store.select = () => of([
      {
        productId: 'product_fake',
        quantity: 2
      }
    ])
    component.ngOnInit();
    expect(component.quantity).toEqual(2);
    expect(component.button.name).toEqual('added');
    expect(component.button.disabled).toBeTruthy();
  });

  it('should set quantity and button config to update when updateStatusButton is called and there is already that product on cart', () => {
    component.productId = 'product_fake2';
    component.cart = [
      {
        productId: 'product_fake',
        quantity: 2
      },
      {
        productId: 'product_fake2',
        quantity: 5
      }
    ]
    component.updateStatusButton(5);
    expect(component.quantity).toEqual(5);
    expect(component.button.name).toEqual('update');
    expect(component.button.disabled).toBeFalsy();
  });

  it('should set quantity and button config to add when updateStatusButton is called and the product is not on cart yet', () => {
    component.productId = 'product_fake2';
    component.cart = [
      {
        productId: 'product_fake',
        quantity: 2
      }
    ]
    component.updateStatusButton(1);
    expect(component.quantity).toEqual(1);
    expect(component.button.name).toEqual('add');
    expect(component.button.disabled).toBeFalsy();
  });

  it('should set quantity to zero if event passed is zero', () => {   
    component.updateStatusButton();
    expect(component.quantity).toEqual(0);
  });

  it('should not set quantity if the event is not a number or empty', () => { 
    component.quantity = 5;  
    component.updateStatusButton('a');
    expect(component.quantity).toEqual(5);
  });

  it('should not call configure cart if button is disabled', () => {
    const spy = spyOn(component, 'configureCart');
    component.button.disabled = true; 
    component.addToCart();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call configure cart if is editable', () => {
    const spy = spyOn(component, 'configureCart');
    component.button.disabled = false; 
    component.isEditable = true; 
    component.addToCart();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should configure cart, button and call store dispatch when addToCart is called and button is not disabled and its not editable', () => {
    const spyConfigureCart = spyOn(component, 'configureCart');
    const spyConfigureButton = spyOn(component, 'configureButton');
    const spyStore = spyOn(store, 'dispatch');
    component.cart = [
      {
        productId: 'product_fake',
        quantity: 2
      }
    ];
    component.productId = 'product_fake';
    component.button.disabled = false; 
    component.isEditable = false; 
    component.addToCart();
    expect(spyConfigureCart).toHaveBeenCalledWith(0);
    expect(spyConfigureButton).toHaveBeenCalled();
    expect(spyStore).toHaveBeenCalled();
  });

  it('should do anything if isEditable when add is called', () => {  
    const spy = spyOn(component, 'updateStatusButton'); 
    component.isEditable = true;
    component.add();   
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call updateStatusButton and set quantity to plus 1 if is not editable when add is called', () => {  
    const spy = spyOn(component, 'updateStatusButton'); 
    component.isEditable = false;
    component.add();    
    expect(spy).toHaveBeenCalled();
    expect(component.quantity).toEqual(1);
  });

  it('should do anything if isEditable when remove is called', () => {  
    const spy = spyOn(component, 'updateStatusButton'); 
    component.isEditable = true;
    component.remove();   
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call updateStatusButton and set quantity to plus 1 if is not editable when remove is called', () => {  
    component.quantity = 1;
    const spy = spyOn(component, 'updateStatusButton'); 
    component.isEditable = false;
    component.remove();    
    expect(spy).toHaveBeenCalled();
    expect(component.quantity).toEqual(0);
  });

  it('should not call updateStatusButton if is not editable when remove is called', () => {  
    component.quantity = 0;
    const spy = spyOn(component, 'updateStatusButton'); 
    component.isEditable = false;
    component.remove();    
    expect(spy).not.toHaveBeenCalled();
  });

  it('should remove an iten of cart at given index if the quantity of that product is zero', () => {  
    component.cart = [
      {
        productId: 'product_fake',
        quantity: 2
      }
    ];
    component.quantity = 0;
    component.configureCart(0);
    expect(component.cart.length).toEqual(0);
  });

  it('should update the quantity of that product on cart if that product already exist and the new quantity is not zero', () => {  
    component.cart = [
      {
        productId: 'product_fake',
        quantity: 3
      }
    ];
    component.quantity = 2;
    component.configureCart(0);
    expect(component.cart[0].quantity).toEqual(2);
  });

  it('should add an iten of cart if index is -1', () => {  
    component.cart = [
      {
        productId: 'product_fake',
        quantity: 2
      }
    ];
    component.configureCart(-1);
    expect(component.cart.length).toEqual(2);
  });
  
  it('should set button name to add and disabled the button when the quantity is zero and configureButton is called', () => { 
    component.quantity = 0; 
    component.configureButton();
    expect(component.button.name).toEqual('add');
    expect(component.button.disabled).toBeTruthy();
  });

  it('should set button name to added and disabled the button when the quantity is zero and configureButton is called', () => { 
    component.quantity = 2; 
    component.configureButton();
    expect(component.button.name).toEqual('added');
    expect(component.button.disabled).toBeTruthy();
  });



});

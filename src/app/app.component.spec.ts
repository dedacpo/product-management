import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ProductService } from './services/product/product.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let productService: ProductService;

  const productServiceStub = {
    getProducts: () => of([])
  }

  const storeStub = {
    dispatch: () => { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        { provide: ProductService, useValue: productServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'product-management'`, () => {
    expect(component.title).toEqual('product-management');
  });

  it('should set clientHeit to 500', () => {
    component.onResized();
    expect(component.clientHeight).toEqual(window.innerHeight);
  });

  it('should set scroll to 0,0', () => {
    const spy = spyOn(window, 'scroll');
    component.onActivate();
    expect(spy).toHaveBeenCalledWith(0, 0);
  });

});

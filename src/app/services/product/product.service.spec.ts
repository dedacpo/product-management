import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductService } from './product.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })
  
  it('should get the sneakers from url and return the array inside result', fakeAsync(() => {
    const dummyResponse =  [{ }, { }] ;
    service.getProducts().subscribe(response => {
      expect(response).toEqual([{ }, { }] as any);
    });
    const req = httpMock.expectOne((request: HttpRequest<any>): boolean => {
      expect(request.url).toEqual('./assets/getProducts.json');
      expect(request.method).toBe('GET');
      return true;
    });
    req.flush(dummyResponse);
    tick();
  }));;
});

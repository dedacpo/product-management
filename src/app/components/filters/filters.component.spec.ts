import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the searchWord to event passed and emit an event', () => {
    const spy = spyOn(component.onUpdateSearch, 'emit');
    component.updateSearch('word');
    expect(component.searchWord).toEqual('word');
    expect(spy).toHaveBeenCalledWith('word');
  });

  it('should  emit event onUpdateOrder when updateOrder method is called', () => {
    const spy = spyOn(component.onUpdateOrder, 'emit');
    const event = {
      value: 'tite asc'
    }
    component.updateOrder(event);
    expect(spy).toHaveBeenCalledWith('tite asc');
  });
});

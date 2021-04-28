import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, NavigationCancel } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  const eventSubject = new ReplaySubject<RouterEvent>(1);

  const routerMock = {
    events: eventSubject.asObservable(),
    navigate: jasmine.createSpy('navigate'),
    url: 'test/url'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [MatMenuModule],
      providers: [
        {
          provide: Router, useValue: routerMock
        },
        {
          provide: ActivatedRoute, useValue: {
            root: {
              firstChild: {
                snapshot: {
                  data: {
                    pageName: 'test'
                  }
                }
              }
            }
          }
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.routeParams = undefined;
    eventSubject.next(new NavigationEnd(1, 'regular', 'redirectUrl'));
    expect(component).toBeTruthy();
    expect(component.routeParams.data.pageName).toEqual('test');
  });

  it('should remain route params as undefined if navigation is not Navigation end', () => {
    component.routeParams = undefined;
    eventSubject.next(new NavigationCancel(1, 'regular', 'redirectUrl'));
    expect(component.routeParams).toBeUndefined();
  });
});

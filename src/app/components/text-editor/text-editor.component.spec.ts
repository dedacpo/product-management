import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

import { TextEditorComponent } from './text-editor.component';

describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call onReady', () => {
    const editor = {
      ui: {
        getEditableElement: ()=> {
          return {
            parentElement: {
              insertBefore: () => {}
            }
          }
        },
        view: {
          toolbar: {
            element: ''
          }
        }
      }
    };
    component.onReady(editor);
    expect(component).toBeTruthy();
  });

  it('should emit onChangeText event when onChange method is called', () => {
    const spy = spyOn(component.onChangeText, 'emit');
    const editor = {
      editor: {
        getData: () => {},
      },
      event: null,
    } as ChangeEvent;
    component.onChange(editor);
    expect(spy).toHaveBeenCalled();
  });
});

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  
  @Input() dataReceived: string;

  Editor = DecoupledEditor;


  @Output() onChangeText:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }



  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  onChange({editor}: ChangeEvent ){
    this.onChangeText.emit( editor.getData());
  }

}

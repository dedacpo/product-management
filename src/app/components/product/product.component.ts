import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() data: IProduct;
  @Input() isEditable: boolean;
  @Input() selected: boolean;
  @Output() onUpdateOrderInternal:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data.order, event.previousIndex, event.currentIndex);
    this.onUpdateOrderInternal.emit(this.data);
  }

}

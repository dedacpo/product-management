import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor() { }

  searchWord:string

  orderFilter;

  @Output() onUpdateSearch:EventEmitter<string> = new EventEmitter();

  @Output() onUpdateOrder:EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  updateSearch(event){
    this.searchWord = event;
    this.onUpdateSearch.emit(this.searchWord);
  }

  updateOrder(event){
    this.onUpdateOrder.emit(event.value);
  }


}

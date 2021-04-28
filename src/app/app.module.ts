import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreComponent } from './pages/store/store.component';
import { ProductComponent } from './components/product/product.component';
import { ManagementComponent } from './pages/management/management.component';
import { QuantityComponent } from './components/quantity/quantity.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SafePipe } from './pipes/safe.pipe';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as storeReducers from './ngStore/store.reducer';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule } from '@angular/material/input';
import { FiltersComponent } from './components/filters/filters.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductComponent,
    ManagementComponent,
    QuantityComponent,
    TextEditorComponent,
    SafePipe,
    TopBarComponent,
    FooterComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CKEditorModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    DragDropModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    StoreModule.forRoot({
      cart: storeReducers.cartReducer,
      products: storeReducers.productsReducer
    })
  ],
  exports:[
    CKEditorModule,
    MatCardModule,
    DragDropModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

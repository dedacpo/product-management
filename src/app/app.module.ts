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

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ProductComponent,
    ManagementComponent,
    QuantityComponent,
    TextEditorComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CKEditorModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    DragDropModule,
  ],
  exports:[
    CKEditorModule,
    MatCardModule,
    DragDropModule,
  ],
  providers: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

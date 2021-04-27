import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ManagementComponent } from './pages/management/management.component';
import { StoreComponent } from './pages/store/store.component';


const routes: Routes = [
    {
        path: '', component: StoreComponent, 
        data: {
            pageName: 'Products',
            backButtonPath: null
        }
    },
    {
        path: 'management', component: ManagementComponent, 
        data: {
            pageName: 'Management',
            backButtonPath: '/'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
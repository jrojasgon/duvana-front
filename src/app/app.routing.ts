import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search/search-result/search-result.component';

const APP_ROUTE: Routes = [    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SearchComponent },
    { path: 'searchResult/:ref/:from/:to/:client', component: SearchResultComponent },
    { path: '**', redirectTo: 'home' }
];

export const AppRouting = RouterModule.forRoot( APP_ROUTE );

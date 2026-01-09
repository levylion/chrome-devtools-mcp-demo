import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
    },
    {
        path: 'brew-log',
        loadComponent: () => import('./features/brew-log/brew-log').then(m => m.BrewLogComponent)
    },
    {
        path: 'add-batch',
        loadComponent: () => import('./features/add-batch/add-batch').then(m => m.AddBatchComponent)
    },
    {
        path: 'recipe-wishlist',
        loadComponent: () => import('./features/recipe-wishlist/recipe-wishlist').then(m => m.RecipeWishlistComponent)
    },
    { path: '**', redirectTo: 'dashboard' }
];

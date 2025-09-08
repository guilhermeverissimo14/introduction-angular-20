import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        // component: List componenete para fazer o carregamento normal das rotas 
        // loadComponent: () => import('./features/list/list').then(m => m.List) // carregamento lazy loading de componentes
        loadChildren: () => import('./features/list/routes').then(m => m.routes) // carregamento lazy loading de módulos ou seja agrupa rotas
    }, 

    {
        path: 'create',
        loadChildren: () => import('./features/create/routes').then(m => m.routes)
    },

    {
        path: 'edit/:id',
        loadChildren: () => import('./features/edit/routes').then(m => m.routes)
    },

    //se ele não encontrar a rota list, ele vai redirecionar para a rota list
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        // component: List componenete para fazer o carregamento normal das rotas 
        // loadComponent: () => import('./features/list/list').then(m => m.List) // carregamento lazy loading de componentes
        loadChildren: () => import('./features/list/routes').then(m => m.routes) // carregamento lazy loading de módulos ou seja agrupa rotas
    }, 

    //se ele não encontrar a rota list, ele vai redirecionar para a rota list
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

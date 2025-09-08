import { Routes } from "@angular/router";
import { Edit } from "./edit";
import { getByIdResolver } from "./resolvers/get-by-id-resolver";

export const routes: Routes = [
    {
        path: '',
        //Esse resolve carrega os dados antes de carregar o componente
        resolve: {
            user: getByIdResolver
        },
        component: Edit
    }
]
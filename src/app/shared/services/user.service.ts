import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import { User, UserPayload } from "../interfaces/user";

@Injectable({
    providedIn: 'root'   // torna o serviço disponível em toda a aplicação 
})

export class UserService {

    httpClient = inject(HttpClient);

    getAll(search?: string) {

        let httpParamns = new HttpParams();
        if(search) {
            // o _like é usado para fazer uma busca parcial, ou seja, se o nome contém o valor de search
            httpParamns = httpParamns.set('q', search);
        }

        return this.httpClient.get<User[]>('http://localhost:3000/users', 
            { params: httpParamns })
            .pipe(             //Pipe é usado para encadear operadores RxJS Significa cano em portugues
                delay(1000)  // simula um atraso de 1 segundo para simular uma requisição assíncrona
            )
    }

    post(payload: UserPayload) {
        return this.httpClient.post<User[]>('http://localhost:3000/users', payload)
            .pipe(
                delay(1000)
            )
    }

    delete(id: number) {
        return this.httpClient.delete(`http://localhost:3000/users/${id}`)
            .pipe(
                delay(1000)
            )
    }
}
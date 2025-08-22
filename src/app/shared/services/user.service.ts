import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable({
    providedIn: 'root'   // torna o serviço disponível em toda a aplicação 
})

export class UserService {

    httpClient = inject(HttpClient); 

    getAll(){
        return this.httpClient.get<string[]>('http://localhost:3000/users')
        .pipe(             //Pipe é usado para encadear operadores RxJS Significa cano em portugues
            delay(1000)  // simula um atraso de 1 segundo para simular uma requisição assíncrona
        )
    }
}
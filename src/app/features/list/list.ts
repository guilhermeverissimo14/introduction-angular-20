import { Component, computed, inject, signal } from "@angular/core";

import { UserService } from "../../shared/services/user.service";
import { UsersList } from "./components/users-list/users-list";
import { SearchInput } from "./components/search-input/search-input";

@Component({
    selector: 'app-list',
    template: `
        @if(!isLoading()) {

        <!-- Esse [(search)] é um banana in de box, que está sendo usado assim por causa do model 
        que criamos no SearchInput.ts, ele é mesma coisa de um input e output juntos, ou seja,
        ele emite o valor que está dentro do model e também recebe um valor para colocar dentro do model. -->
        <app-search-input [(search)]="search"/>

        <app-users-list [users]="filterdUsers()" (remove)="remove($event)"/>

        } @else {
        <p>Carregando...</p>
        }
    `,  //template significa que o html vai ficar nesse aquivo, templateUrl significa que o html vai ficar em outro arquivo ex: templateUrl: './list.html'
    styles: '',
    imports: [UsersList, SearchInput],  //styles significa que o css vai ficar nesse aquivo, styleUrl significa que o css vai ficar em outro arquivo ex: styleUrl: './list.scss'
})
export class List {
   userService = inject(UserService);

  isLoading = signal(true);

  search = signal('');

  users = signal<string[]>([]);

 filterdUsers = computed(()=>{
  //joga tudo para minusculo e verifica se o que foi digitado está contido no nome
  return this.users().filter(user => user.toLocaleLowerCase().includes(this.search().toLocaleLowerCase()));
 })

  ngOnInit() {
   this.userService.getAll().subscribe(users => {
     this.users.set(users);
      this.isLoading.set(false);
   });
  }
  

  remove(user: string) {
    this.users.update(users => users.filter(u => u !== user));
  }
}
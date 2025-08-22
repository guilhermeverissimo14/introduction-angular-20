import { Component, computed, signal } from '@angular/core';
import { UsersList } from "./list/components/users-list/users-list";
import { SearchInput } from "./list/components/search-input/search-input";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [UsersList, SearchInput]
})
export class App {
  search = signal('');

 filterdUsers = computed(()=>{
  //joga tudo para minusculo e verifica se o que foi digitado está contido no nome
  return this.users().filter(user => user.toLocaleLowerCase().includes(this.search().toLocaleLowerCase()));
 })
  
  users = signal(["Rodrigo","João","Maria","Ana","Pedro","Lucas",])

  remove(user: string) {
    this.users.update(users => users.filter(u => u !== user));
  }

}

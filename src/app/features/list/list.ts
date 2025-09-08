import { Component, computed, DestroyRef, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { UserService } from "../../shared/services/user.service";
import { UsersList } from "./components/users-list/users-list";
import { SearchInput } from "./components/search-input/search-input";
import { User } from "../../shared/interfaces/user";
import { take } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-list',
  templateUrl: './list.html',  //template significa que o html vai ficar nesse aquivo, templateUrl significa que o html vai ficar em outro arquivo ex: templateUrl: './list.html'        
  styleUrls: ['./list.scss'], //styles significa que o css vai ficar nesse aquivo, styleUrl significa que o css vai ficar em outro arquivo ex: styleUrl: './list.scss'
  imports: [UsersList, SearchInput, RouterLink, MatButtonModule],  
})
export class List {

  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  isLoading = signal(true);

  search = signal('');

  users = signal<User[]>([]);

  filterdUsers = computed(() => {
    //joga tudo para minusculo e verifica se o que foi digitado está contido no nome
    return this.users().filter(user => user.name.toLocaleLowerCase().includes(this.search().toLocaleLowerCase()));
  })

  //Esse cara lembra muito o useEffect do React
  //Toda vez que o valor de search mudar, esse efeito vai ser executado
  //O efeito é executado uma vez quando o componente é criado
  effect = effect(() => {
    console.log('Search mudou para: ', this.search());
    this.isLoading.set(true);

    this.getUsers();
  })


  ngOnInit() {
    this.getUsers();
  }


  remove({ id }: User) {
    this.userService.delete(id).subscribe(() => {
      this.users.update(users => users.filter(u => u.id !== id));
    });
  }

  edit(user: User) {
    this.router.navigate(['/edit', user.id]);
  }

  private getUsers() {

    // Se tem alguma coisa no search que vem do valor digitado o computed reagi e filtra.
    this.userService.getAll(this.search())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        take(1)
      )
      .subscribe(users => {
        this.users.set(users);
        this.isLoading.set(false);
      });
  }
}
import { Component, computed, DestroyRef, effect, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { UserService } from "../../shared/services/user.service";
import { UsersList } from "./components/users-list/users-list";
import { SearchInput } from "./components/search-input/search-input";
import { User } from "../../shared/interfaces/user";
import { take } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  template: `

        <div>
          <!-- Com o Router Link você navega entre as rotas da aplicação sem recarregar a página. Ou seja uma navegação que acontece dentro do index.html -->
          <a routerLink="/create">Criar Usuário</a>  
        </div>

          <!-- Esse [(search)] é um banana in de box, que está sendo usado assim por causa do model 
          que criamos no SearchInput.ts, ele é mesma coisa de um input e output juntos, ou seja,
          ele emite o valor que está dentro do model e também recebe um valor para colocar dentro do model. -->
          <app-search-input [(search)]="search"/>

        @if(isLoading()) {
          <p>Carregando...</p>
        } @else {
          <app-users-list [users]="filterdUsers()" (remove)="remove($event)"/>
        }
    `,  //template significa que o html vai ficar nesse aquivo, templateUrl significa que o html vai ficar em outro arquivo ex: templateUrl: './list.html'
  styles: '',
  imports: [UsersList, SearchInput, RouterLink],  //styles significa que o css vai ficar nesse aquivo, styleUrl significa que o css vai ficar em outro arquivo ex: styleUrl: './list.scss'
})
export class List {
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);

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
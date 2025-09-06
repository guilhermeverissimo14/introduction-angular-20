import { Component, computed, inject, input, output, signal } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/interfaces/user';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ErrorBtn } from './directives/error-btn/error-btn';

@Component({
  selector: 'app-users-list',
  imports: [MatCardModule, MatButtonModule, ErrorBtn],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {

  userService = inject(UserService);

  public users = input.required<User[]>();
  public removeUser =  output<User>({alias: 'remove'});  // alias é usado para renomear o evento emitido

  remove(user: User) {
   this.removeUser.emit(user);
  }
  
}

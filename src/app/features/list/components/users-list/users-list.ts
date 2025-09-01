import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-users-list',
  imports: [FormsModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList {

  userService = inject(UserService);

  public users = input.required<User[]>();
  public removeUser =  output<User>({alias: 'remove'});  // alias é usado para renomear o evento emitido

  remove(user: User) {
   this.removeUser.emit(user);
  }
  
}

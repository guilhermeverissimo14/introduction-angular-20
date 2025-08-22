import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  imports: [FormsModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList {

  public users = input.required<string[]>();
  public removeUser =  output<string>({alias: 'remove'});  // alias é usado para renomear o evento emitido

  remove(user: string) {
   this.removeUser.emit(user);
  }
  
}

import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss'
})
export class SearchInput {

  //cria um model para fazer o two way data binding
  search = model('');

}

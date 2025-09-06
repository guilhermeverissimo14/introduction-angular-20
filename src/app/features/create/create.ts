import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule, RouterLink],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {

  userService = inject(UserService);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', {validators: [Validators.required], nonNullable: true})  //nonNullable: true significa que o valor não pode ser nulo, Isso ajuda na tipagem que mesmo o Validators sendo required ele considera que ele pode ser null
  })

  onSubmit() {
   
    const user = this.form.controls.name.value;

    this.userService.post({ name: user }).subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    })

    
  }
}

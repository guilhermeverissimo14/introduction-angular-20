import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit implements OnInit {

  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  //recupera o id que está na rota
  id = signal<number>(Number(this.activatedRoute.snapshot.paramMap.get('id')));

  form = new FormGroup({
    //nonNullable: true significa que o valor não pode ser nulo, Isso ajuda na tipagem que mesmo o Validators sendo required ele considera que ele pode ser null
    name: new FormControl('', {validators: [Validators.required], nonNullable: true})  
  })

  ngOnInit() {
    this.userService.getById(this.id()).subscribe(user => {
      this.form.controls.name.setValue(user.name);
    });
  }

  onSubmit() {
   
    const user = this.form.controls.name.value;

    this.userService.put(this.id(), { name: user }).subscribe({
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

import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/interfaces/user';

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

  //Esse user é um signal que recebe os dados do resolver
  //O snapshot.data['user'] pega os dados que foram carregados pelo resolver
  //O resolver carrega os dados antes de carregar o componente
  //Dessa forma o componente já carrega com os dados
  //Ele já faz a requisição com o endpoint usando o id que está na rota

  // user = signal(this.activatedRoute.snapshot.data['user']);

  //O input é usado para pegar o valor do resolver
  user = input.required<User>();


  form = new FormGroup({
    //nonNullable: true significa que o valor não pode ser nulo, Isso ajuda na tipagem que mesmo o Validators sendo required ele considera que ele pode ser null
    name: new FormControl('', {validators: [Validators.required], nonNullable: true})  
  })

  ngOnInit() {
    this.form.controls.name.setValue(this.user().name);
  }

  onSubmit() {
   
    const user = this.form.controls.name.value;

    this.userService.put(this.user().id, { name: user }).subscribe({
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

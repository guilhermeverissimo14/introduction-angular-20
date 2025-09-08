import { ResolveFn } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { inject } from '@angular/core';
import { User } from '../../../shared/interfaces/user';

export const getByIdResolver: ResolveFn<User> = (route, state) => {

  //Esse resolve é usado para carregar os dados antes de carregar o componente
  //Dessa forma o componente já carrega com os dados
  //Ele já faz a requisição com o endpoint usando o id que está na rota

  const userService = inject(UserService);

   //recupera o id que está na rota
  const id = route.paramMap.get('id')!;

  return userService.getById(id);

};

export interface User {
  id: number;
  name: string;
}

// Omit é usado para omitir uma propriedade de um tipo, nesse caso estamos omitindo o id do User, ou seja, o UserPayload vai ter todas as propriedades do User menos o id
export type UserPayload  = Omit<User, 'id'>; 
import { useState } from 'react';

export default class LoginFilter {
  public cpf: string;

  public setCpf: any;

  public senha: string;

  public setSenha: any;

  constructor() {
    [this.cpf, this.setCpf] = useState('');
    [this.senha, this.setSenha] = useState('');
  }
}

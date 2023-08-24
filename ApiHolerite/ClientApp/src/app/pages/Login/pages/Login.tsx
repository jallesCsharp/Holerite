import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { BordaCampo, Container, ModelLogin } from '../styles/styles';
import { LoginModel } from '../../../@types/model/LoginModel';
import LoginController from '../controllers/LoginController';

export const Login: React.FC = () => {
  const controller = new LoginController();
  useEffect(() => {
    controller.init();
  }, []);

  const [isCadastrar, setIsCadastrar] = useState(false);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (cpf && password) {
      const userLogin: LoginModel = {
        cpf: cpf,
        senha: password,
      };

      controller.logar(userLogin);

      // const isLogged = await auth.authLogin(userLogin);
      // console.log('isLogged');
      // console.log(isLogged);
      // authService.save(Object.values(isLogged)[1]);

      // if (isLogged.success) {
      //   return <Link to="/"></Link>;
      // } else {
      //   alert('Senha ou E-mail errado!!!');
      // }
    }
  };

  return (
    <Container>
      <div className="col-12">
        <ModelLogin>
          <div className="card p-fluid">
            <div className="field grid">
              <label htmlFor="cpf-cnpj" className="col-12 mb-2 md:col-2">
                CPF/CNPJ
              </label>
              <div className="col-12 md:col-10">
                <BordaCampo />
                <InputText
                  id="cpf-cnpj"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
            </div>
            <div className="field grid">
              <label htmlFor="pass" className="col-12 mb-2 md:col-2">
                Senha
              </label>
              <div className="col-12 md:col-10">
                <BordaCampo />
                <InputText
                  id="pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {isCadastrar && (
              <div className="field grid">
                <label htmlFor="pass" className="col-12 mb-2 md:col-2">
                  Confirmar Senha
                </label>
                <div className="col-12 md:col-10">
                  <BordaCampo />
                  <InputText
                    id="pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            {!isCadastrar && (
              <div className="field grid">
                <div className="col-12 md:col-6">
                  <Button label="Logar" onClick={handleLogin}></Button>
                </div>
                <div className="col-12 md:col-6">
                  <Button label="Novo Cadastro" onClick={() => setIsCadastrar(true)}></Button>
                </div>
              </div>
            )}
            {isCadastrar && (
              <div className="field grid">
                <div className="col-12 md:col-6">
                  <Button label="Voltar" onClick={() => setIsCadastrar(false)}></Button>
                </div>
                <div className="col-12 md:col-6">
                  <Button label="Salvar" onClick={() => setIsCadastrar(false)}></Button>
                </div>
              </div>
            )}
          </div>
        </ModelLogin>
      </div>
    </Container>
  );
};

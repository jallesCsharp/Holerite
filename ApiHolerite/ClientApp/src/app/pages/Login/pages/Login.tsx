import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { BordaCampo, Container, ModelLogin } from '../styles/styles';
import { LoginModel } from '../../../@types/model/LoginModel';
import LoginController from '../controllers/LoginController';
import { ProgressSpinner } from 'primereact/progressspinner';

const Login: React.FC = () => {
  const controller = new LoginController();
  useEffect(() => {
    controller.init();
  }, []);

  const [isCadastrar, setIsCadastrar] = useState(false);
  const [loginAuth, setLoginAuth] = useState('');
  const [spinner, setSpinner] = useState<boolean>(false);
  const [password, setPassword] = useState('');

  // function validade() {
  //   SetIsError(false);
  //   return false;
  // }

  const handleLogin = async () => {
    // setSpinner(true);
    console.log('antes logar');

    const userLogin: LoginModel = {
      cpf: loginAuth,
      password: password,
    };
    await controller.logar(userLogin);
    console.log('Login teste');

    setSpinner(false);
    // const isLogged = await auth.authLogin(userLogin);
    // console.log('isLogged');
    // console.log(isLogged);P
    // authService.save(Object.values(isLogged)[1]);

    // if (isLogged.success) {
    //   return <Link to="/"></Link>;
    // } else {
    //   alert('Senha ou E-mail errado!!!');
    // }
  };

  return (
    <Container>
      {spinner ? (
        <ProgressSpinner aria-label="Loading" />
      ) : (
        <div className="col-12">
          <ModelLogin>
            <div className="card p-fluid">
              <div className="field grid">
                <label htmlFor="cpf-cnpj" className="col-12 mb-2 md:col-2">
                  CPF
                </label>
                <div className="col-12 md:col-10">
                  <BordaCampo />
                  <InputText
                    id="cpf-cnpj"
                    type="text"
                    value={loginAuth}
                    onChange={(e) => setLoginAuth(e.target.value)}
                  />
                  {!loginAuth && controller.submitted && (
                    <small className="p-invalid">Campo é obrigatório.</small>
                  )}
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
                  {!password && controller.submitted && (
                    <small className="p-invalid">Senha é obrigatório.</small>
                  )}
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
                  <div className="col-12 md:col-5"></div>
                  <div className="col-12 md:col-4">
                    <Button label="Logar" onClick={handleLogin}></Button>
                  </div>
                  <div className="col-12 md:col-3"></div>
                  {/* <div className="col-12 md:col-6">
                    <Button label="Novo Cadastro" onClick={() => setIsCadastrar(true)}></Button>
                  </div> */}
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
      )}
    </Container>
  );
};
export default Login;

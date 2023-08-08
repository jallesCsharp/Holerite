import React, { useEffect } from 'react';
import AuthService from '../../../../../provider/services/authService';
import CepService from '../../../../services/CepService';
// import ToastService from '../../../../../provider/services/toastService';

const Perfil: React.FC = () => {
  const auth = new AuthService();
  const cep = new CepService();

  useEffect(() => {
    // ToastService.showSuccess('Teste');
    const testeCep = cep.getCep('74770040');
    console.log('testeCep');
    console.log(testeCep);
    console.log(auth.getUser());
    console.log(auth.isAuthenticated());
    console.log(auth.temPermissao);
    console.log(auth.verificaPermissaoAcessoPagina);
  }, []);
  return (
    <>
      <h2>Perfil</h2>
    </>
  );
};
export default Perfil;

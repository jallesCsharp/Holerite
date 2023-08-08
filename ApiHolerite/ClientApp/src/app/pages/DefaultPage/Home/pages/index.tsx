import React, { useEffect } from 'react';
// import ToastService from '../../../../../provider/services/toastService';

const Home: React.FC = () => {
  useEffect(() => {
    // ToastService.showSuccess('Home');
  }, []);
  return (
    <>
      <h2>Home</h2>
    </>
  );
};
export default Home;

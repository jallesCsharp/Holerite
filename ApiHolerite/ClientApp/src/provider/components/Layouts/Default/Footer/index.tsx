import React from 'react';
import './index.scss';
import { Button } from 'primereact/button';

const Footer: React.FC = () => {
  return (
    <>
      <div></div>
      <footer>
        <span>Desenvolvedor - @Jalles Silva</span>
        <Button
          name="Whats"
          onClick={() => (window.location.href = 'http://wa.me/5562992447544')}
        />
      </footer>
    </>
  );
};
export default Footer;

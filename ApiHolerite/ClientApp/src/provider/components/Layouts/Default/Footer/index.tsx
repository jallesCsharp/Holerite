import React from 'react';
import './index.scss';
import { Button } from 'primereact/button';

const Footer: React.FC = () => {
  return (
    <>
      <div></div>
      <footer>
        <span>
          Desenvolvedor - @Jalles Silva
          <Button
            icon="pi pi-whatsapp"
            name="Whats"
            className="p-button-rounded p-button-info mr-8"
            onClick={() => (window.location.href = 'http://wa.me/5562992447544')}
          />
        </span>
      </footer>
    </>
  );
};
export default Footer;

import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel';
import AuthService from '../../../../services/authService';
import './index.scss';

interface Props {
  onClick: () => void;
}

const Topbar: React.FC<Props> = ({ onClick }) => {
  const op: any = useRef(null);
  const authService = new AuthService();
  const auth = authService.getUser();
  console.log(' - perfil');
  console.log(auth);
  const history = useHistory();

  return (
    <>
      <header className="topbar">
        <div className="topbar-wrapper">
          <div className="topbar-menu-button">
            <button onClick={() => onClick()} type="button" className="topbar-menu-button">
              <i className="fa-solid fa-bars topbar-menu-icon" />
            </button>
          </div>
          <Link to="/home">
            <div className="topbar-logo">
              <div className="topbar-title">
                <h2>Holerite</h2>
              </div>
            </div>
          </Link>
        </div>
        <div className="topbar-actions">
          <button
            className="topbar-menu-button"
            type="button"
            onClick={(e) => {
              if (op != null) {
                op.current.toggle(e);
              }
            }}
          >
            <i className="fa-solid fa-user topbar-menu-icon" />
          </button>
          {/* <OverlayPanel appendTo="self" ref={op}>
            <div className="topbar-user-info">
              {auth && auth.user && auth.user.name && (
                <h2>
                  <b>Nome: </b>
                  {auth.user.name}
                </h2>
              )}
              <h2 className="topbar-exit" onClick={() => history.push('/logout')}>
                Sair
              </h2>
            </div>
          </OverlayPanel> */}
          <OverlayPanel appendTo="self" ref={op}>
            <div className="topbar-user-info">
              <h2>{auth.nomeUsuario}</h2>
              <h2>Teste</h2>
              <h2 className="topbar-exit" onClick={() => history.push('/logout')}>
                Sair
              </h2>
            </div>
          </OverlayPanel>
        </div>
      </header>
    </>
  );
};

export default Topbar;

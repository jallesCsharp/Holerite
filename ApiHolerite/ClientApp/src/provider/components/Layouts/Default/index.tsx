import React, { ReactNode, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './index.scss';
import Footer from './Footer';
import { BreadCrumb } from 'primereact/breadcrumb';
import BreadCrumbService from '../../../services/breadCrumbService';
import { MenuItem } from '../../../@types/menu';
import { Toast } from 'primereact/toast';
import ToastService from '../../../services/toastService';

interface Props {
  children: ReactNode;
  menuItems: MenuItem[];
}

const Default: React.FC<Props> = ({ menuItems, children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const breadCrumb = new BreadCrumbService().getCurrentState();

  function handleToggleSidebar() {
    localStorage.setItem('isOpen', !sideBarOpen ? 'S' : 'N');
    setSideBarOpen(!sideBarOpen);
  }

  useEffect(() => {
    window.addEventListener(
      'resize',
      function () {
        if (window.innerWidth <= 992) {
          setSideBarOpen(false);
          localStorage.setItem('isOpen', 'N');
        } else if (window.innerWidth > 993 && localStorage.getItem('isOpen') === 'N') {
          setSideBarOpen(true);
          localStorage.setItem('isOpen', 'S');
        }
      },
      {},
    );
    if (window.innerWidth <= 992) {
      setSideBarOpen(false);
    }
  }, []);

  const home = { icon: 'pi pi-home', url: '/' };
  return (
    <div className="default-container">
      <Toast baseZIndex={8000} ref={(el) => ToastService.init(el)} style={{ paddingTop: 40 }} />
      <Topbar onClick={handleToggleSidebar} />
      <div className="default-principal-wrapper">
        <Sidebar isOpen={sideBarOpen} menuItems={menuItems} />
        <div className={sideBarOpen === false ? 'children-wrapper' : 'default-children-wrapper'}>
          <div>
            <BreadCrumb model={breadCrumb.items} home={home} />
            <div className="default-children">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Default;

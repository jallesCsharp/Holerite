import React from 'react';
import './index.scss';
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from '../../../../@types/menu';

interface Props {
  menuItems: MenuItem[];
  isOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ menuItems, isOpen }) => {
  return (
    <>
      <div className="sidebar-size">
        {!isOpen ? (
          <></>
        ) : (
          <>
            <div className="sidebar-wrapper">
              <div className="sidebar-container">
                <PanelMenu model={menuItems} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;

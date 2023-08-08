import React from 'react';
import { Dropdown, DropdownProps } from 'primereact/dropdown';

const ProDropdown: React.FC<DropdownProps> = ({ ...rest }) => {
  return (
    <Dropdown
      filter
      filterBy="name"
      optionLabel="name"
      showClear
      emptyMessage="Nenhum registro"
      emptyFilterMessage="Nenhum registro"
      placeholder="Selecionar"
      appendTo="self"
      {...rest}
    />
  );
};
export default ProDropdown;

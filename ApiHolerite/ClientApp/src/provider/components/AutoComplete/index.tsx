import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';

const itemTemplatePadrao = (item: any) => {
  return (
    <div className="item">
      <div>{item.name}</div>
    </div>
  );
};

const ProAutoComplete: React.FC<any> = ({
  campo,
  setCampo,
  suggestions,
  search,
  itemTemplate,
  ...rest
}) => {
  return (
    <AutoComplete
      optionLabel="name"
      placeholder="Selecionar"
      emptyMessage="Nenhum registro"
      emptyFilterMessage="Nenhum registro"
      value={campo}
      suggestions={suggestions}
      completeMethod={search}
      field="name"
      dropdown
      forceSelection
      itemTemplate={itemTemplate ? itemTemplate : itemTemplatePadrao}
      onChange={(e: any) => {
        setCampo(e.value);
      }}
      {...rest}
    />
  );
};
export default ProAutoComplete;

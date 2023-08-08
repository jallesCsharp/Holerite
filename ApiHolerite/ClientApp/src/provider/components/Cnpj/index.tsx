import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';

const AnttCnpj: React.FC<any> = ({ campo, setCampo, placeHolder, ...rest }) => {
  const cpnjMask = '99.999.999/9999-99';
  const [mask, setMask] = useState(cpnjMask);
  return (
    <>
      <InputMask
        placeholder={placeHolder}
        mask={mask}
        className="form-control"
        value={campo}
        slotChar={'_'}
        autoClear={false}
        unmask={true}
        onChange={(e: any) => {
          setCampo(e.target.value);
          setMask(cpnjMask);
        }}
        {...rest}
      />
    </>
  );
};
export default AnttCnpj;

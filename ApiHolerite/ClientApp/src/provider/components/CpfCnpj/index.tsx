import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';

const AnttCpfCnpj: React.FC<any> = ({ campo, setCampo, placeHolder, ...rest }) => {
  const cpnjMask = '99.999.999/9999-99';
  const cpfMask = '999.999.999-999';
  const [mask, setMask] = useState(cpfMask);
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
          if (e.target.value.length > 11) {
            setMask(cpnjMask);
          } else if (e.target.value.length <= 11) {
            setMask(cpfMask);
          }
        }}
        {...rest}
      />
    </>
  );
};
export default AnttCpfCnpj;

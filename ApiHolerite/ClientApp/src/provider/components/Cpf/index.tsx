import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';

const AnttCpf: React.FC<any> = ({ campo, setCampo, placeHolder, ...rest }) => {
  const cpfMask = '999.999.999-99';
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
          setMask(cpfMask);
        }}
        {...rest}
      />
    </>
  );
};
export default AnttCpf;

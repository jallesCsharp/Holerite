import { Dialog } from 'primereact/dialog';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(05px + 2vmin);
  width: 100vw;
  height: 100vh;
`;

export const DialogPartido = styled(Dialog)`
  width: 550px;
`;

export const ModelLogin = styled.div`
  width: 45%;
  position: relative;
  left: 25% !important;
  right: 25% !important;
  bottom: auto !important;
  right: auto !important;
`;

export const BordaCampo = styled.div`
  margin: 1%;
`;

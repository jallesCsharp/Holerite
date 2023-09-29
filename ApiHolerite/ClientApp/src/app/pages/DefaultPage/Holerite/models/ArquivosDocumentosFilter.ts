import { useState } from 'react';
import { ArquivosDocumentosModel } from '../../../../@types/model/ArquivosDocumentosModel';

export default class ArquivosDocumentosFilter {
  public onVisualizar?: boolean;

  public setOnVisualizar: any;

  public aquivosDocumentosModel?: ArquivosDocumentosModel;

  public setArquivosDocumentosModel: any;

  public listaArquivosDocumentosModel?: ArquivosDocumentosModel[];

  public setListaArquivosDocumentosModel: (e: any) => void;

  constructor() {
    [this.onVisualizar, this.setOnVisualizar] = useState<boolean>(false);
    [this.aquivosDocumentosModel, this.setArquivosDocumentosModel] =
      useState<ArquivosDocumentosModel>();
    [this.listaArquivosDocumentosModel, this.setListaArquivosDocumentosModel] =
      useState<ArquivosDocumentosModel[]>();
  }
}

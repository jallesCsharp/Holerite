import { useState } from 'react';

export default class FileFilter {
  public errorStatus?: boolean;

  public setErrorStatus: any;

  public sucessoStatus?: boolean;

  public setSucessoStatus: any;

  public msgerror?: any[];

  public setMsgError: any;

  public msgSucesso?: any[];

  public setMsgSucesso: any;

  public file?: FormData;

  public setFile: any;

  public onEniar?: boolean;

  public setEnviar: any;

  public onLoading?: boolean;

  public setLoading: any;

  constructor() {
    [this.errorStatus, this.setErrorStatus] = useState<boolean>(false);
    [this.msgerror, this.setMsgError] = useState<any>();
    [this.sucessoStatus, this.setSucessoStatus] = useState<boolean>(false);
    [this.msgSucesso, this.setMsgSucesso] = useState<any>();
    [this.file, this.setFile] = useState<FormData>();
    [this.onEniar, this.setEnviar] = useState<boolean>();
    [this.onLoading, this.setLoading] = useState<boolean>(false);
  }
}

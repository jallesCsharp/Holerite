import { useState } from 'react';

export default class FileFilter {
  public file?: FormData;

  public setFile: any;

  public onEniar?: boolean;

  public setEnviar: any;

  public onLoading?: boolean;

  public setLoading: any;

  constructor() {
    [this.file, this.setFile] = useState<FormData>();
    [this.onEniar, this.setEnviar] = useState<boolean>();
    [this.onLoading, this.setLoading] = useState<boolean>(false);
  }
}

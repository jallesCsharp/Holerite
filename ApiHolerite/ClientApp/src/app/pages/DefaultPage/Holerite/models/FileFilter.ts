import { useState } from 'react';

export default class FileFilter {
  public file?: FormData;

  public setFile: any;

  public onEniar?: boolean;

  public setEniar: any;

  public onLoading?: boolean;

  public setLoading: any;

  constructor() {
    [this.file, this.setFile] = useState<FormData>();
    [this.onEniar, this.setEniar] = useState<boolean>();
    [this.onLoading, this.setLoading] = useState<boolean>(false);
  }
}

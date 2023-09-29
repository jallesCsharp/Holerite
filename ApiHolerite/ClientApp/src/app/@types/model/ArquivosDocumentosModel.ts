export interface ArquivosDocumentosModel {
  id: string | null;
  nome: string | null;
  arquivo: BinaryType | null;
  created: Date | null;
  updated: Date | null;
  deleted: Date | null;
  totalImportados: number | null;
}

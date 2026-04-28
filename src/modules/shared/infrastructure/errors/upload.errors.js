export class InvalidUploadMimeTypeError extends Error {
  constructor(message = "Tipo de ficheiro não permitido para este upload.") {
    super(message);
    this.name = "InvalidUploadMimeTypeError";
  }
}

export class UploadTooLargeError extends Error {
  constructor(message = "O ficheiro excede o tamanho máximo permitido.") {
    super(message);
    this.name = "UploadTooLargeError";
  }
}

export class UploadMissingFileError extends Error {
  constructor(message = "Nenhum ficheiro foi enviado.") {
    super(message);
    this.name = "UploadMissingFileError";
  }
}

export class AssetUploadFailedError extends Error {
  constructor(message = "Não foi possível processar o upload do ficheiro.") {
    super(message);
    this.name = "AssetUploadFailedError";
  }
}

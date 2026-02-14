export interface ParamsUpload {
  fileName: string
  fileBuffer: Buffer
  contentType: string
}

export interface UploadResponsePromise {
  url: string
}

export interface StorageProvider {
  upload(params: ParamsUpload): Promise<UploadResponsePromise>
}

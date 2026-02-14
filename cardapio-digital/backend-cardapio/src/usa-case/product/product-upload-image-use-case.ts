import { ParamsUpload } from "@/infra/repositories/storage-provider-interface";
import { UploaddImageRepository } from "@/infra/repositories/storage/upload-image-repository";

interface ProductUploadImageUseCaseRequest {
    fileName: string
    fileBuffer: Buffer
    contentType: string
}

interface ProductUploadImageUseCaseResponse {
    url: string
}



export class ProductUploadImageUseCase {
    constructor(
        private uploadImageRepository: UploaddImageRepository
    ){}

    async execute(file: ProductUploadImageUseCaseRequest ): Promise<ProductUploadImageUseCaseResponse> {
        const { url } = await this.uploadImageRepository.upload(file)
        return {
            url,
        }
    }
}
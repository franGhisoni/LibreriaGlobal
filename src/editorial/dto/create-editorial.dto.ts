import { CreateAddressDto } from './create-address.dto'

export class CreateEditorialDto {
    nombre: string;
    cuit: number;
    address: CreateAddressDto;
}

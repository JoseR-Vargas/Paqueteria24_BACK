import { IsEmail, IsString, IsNotEmpty, IsArray, IsOptional, MaxLength, IsIn, IsDateString } from 'class-validator';

export class CreateFormDto {
	@IsString()
	@IsNotEmpty({ message: 'El nombre es obligatorio' })
	nombre: string;

	@IsString()
	@IsNotEmpty({ message: 'La cédula o RUT es obligatorio' })
	cedula: string;

	@IsString()
	@IsNotEmpty({ message: 'El teléfono es obligatorio' })
	telefono: string;

	@IsEmail({}, { message: 'El email debe tener un formato válido' })
	@IsNotEmpty({ message: 'El email es obligatorio' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'El comentario es obligatorio' })
	@MaxLength(300, { message: 'El comentario no puede exceder 300 caracteres' })
	comentario: string;

	@IsOptional()
	@IsArray()
	@IsIn(['mercado-libre', 'ecommerce', 'privado'], { each: true, message: 'Tipo de paquetería inválido' })
	paqueteria: string[];

	@IsDateString()
	@IsNotEmpty({ message: 'La fecha es obligatoria' })
	fecha: string;
}

import { 
	Controller, 
	Get, 
	Post, 
	Body, 
	Patch, 
	Param, 
	Delete, 
	ValidationPipe,
	HttpStatus,
	HttpCode
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('form')
export class FormController {
	constructor(private readonly formService: FormService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(ValidationPipe) createFormDto: CreateFormDto) {
		console.log('📝 Nuevo contacto recibido:', createFormDto);
		const result = await this.formService.create(createFormDto);
		
		return {
			success: true,
			message: 'Mensaje enviado exitosamente',
			data: result
		};
	}

	@Get()
	async findAll() {
		const result = await this.formService.findAll();
		
		return {
			success: true,
			message: 'Contactos obtenidos exitosamente',
			data: result,
			count: result.length
		};
	}

	@Get('stats')
	async getStats() {
		const result = await this.formService.getStats();
		
		return {
			success: true,
			message: 'Estadísticas obtenidas exitosamente',
			data: result
		};
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const result = await this.formService.findOne(id);
		
		return {
			success: true,
			message: 'Contacto encontrado',
			data: result
		};
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body(ValidationPipe) updateFormDto: UpdateFormDto) {
		const result = await this.formService.update(id, updateFormDto);
		
		return {
			success: true,
			message: 'Contacto actualizado exitosamente',
			data: result
		};
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		const result = await this.formService.remove(id);
		
		return {
			success: true,
			message: 'Contacto eliminado exitosamente',
			data: result
		};
	}
}

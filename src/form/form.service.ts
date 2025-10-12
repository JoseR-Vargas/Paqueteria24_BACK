import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form, FormDocument } from './entities/form.entity';

@Injectable()
export class FormService {
	constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

	async create(createFormDto: CreateFormDto): Promise<Form> {
		try {
			// Convertir fecha ISO string a Date object
			const formData = {
				...createFormDto,
				fecha: new Date(createFormDto.fecha),
				email: createFormDto.email.toLowerCase().trim(),
				paqueteria: createFormDto.paqueteria || []
			};

			const createdForm = new this.formModel(formData);
			const savedForm = await createdForm.save();
			
			console.log('✅ Contacto guardado en BD:', savedForm);
			return savedForm;
		} catch (error) {
			console.error('❌ Error al guardar contacto:', error);
			throw new BadRequestException('Error al guardar el contacto');
		}
	}

	async findAll(): Promise<Form[]> {
		try {
			const forms = await this.formModel
				.find()
				.sort({ createdAt: -1 }) // Más recientes primero
				.exec();
			
			console.log(`📊 Contactos encontrados: ${forms.length}`);
			return forms;
		} catch (error) {
			console.error('❌ Error al obtener contactos:', error);
			throw new BadRequestException('Error al obtener los contactos');
		}
	}

	async findOne(id: string): Promise<Form> {
		try {
			const form = await this.formModel.findById(id).exec();
			if (!form) {
				throw new NotFoundException(`Contacto con ID ${id} no encontrado`);
			}
			return form;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new BadRequestException('Error al buscar el contacto');
		}
	}

	async update(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
		try {
			const updatedForm = await this.formModel
				.findByIdAndUpdate(id, updateFormDto, { new: true })
				.exec();
			
			if (!updatedForm) {
				throw new NotFoundException(`Contacto con ID ${id} no encontrado`);
			}
			
			return updatedForm;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new BadRequestException('Error al actualizar el contacto');
		}
	}

	async remove(id: string): Promise<Form> {
		try {
			const deletedForm = await this.formModel.findByIdAndDelete(id).exec();
			if (!deletedForm) {
				throw new NotFoundException(`Contacto con ID ${id} no encontrado`);
			}
			return deletedForm;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new BadRequestException('Error al eliminar el contacto');
		}
	}

	// Método adicional para estadísticas
	async getStats() {
		try {
			const totalContacts = await this.formModel.countDocuments();
			const contactsByType = await this.formModel.aggregate([
				{ $unwind: { path: '$paqueteria', preserveNullAndEmptyArrays: true } },
				{ $group: { _id: '$paqueteria', count: { $sum: 1 } } },
				{ $sort: { count: -1 } }
			]);

			return {
				total: totalContacts,
				byType: contactsByType
			};
		} catch (error) {
			console.error('❌ Error al obtener estadísticas:', error);
			throw new BadRequestException('Error al obtener estadísticas');
		}
	}
}

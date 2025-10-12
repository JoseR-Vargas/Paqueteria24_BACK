import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema({ 
  timestamps: true,
  collection: 'contactos' // Nombre específico de la colección
})
export class Form {
	@Prop({ required: true, trim: true })
	nombre: string;

	@Prop({ required: true, trim: true })
	cedula: string;

	@Prop({ required: true, trim: true })
	telefono: string;

	@Prop({ required: true, trim: true, lowercase: true })
	email: string;

	@Prop({ required: true, trim: true, maxlength: 300 })
	comentario: string;

	@Prop({ 
		type: [String], 
		required: false, 
		default: [],
		enum: ['mercado-libre', 'ecommerce', 'privado']
	})
	paqueteria: string[];

	@Prop({ required: true })
	fecha: Date;
}

export const FormSchema = SchemaFactory.createForClass(Form);

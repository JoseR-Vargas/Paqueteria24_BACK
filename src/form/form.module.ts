import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormGateway } from './form.gateway';
import { Form, FormSchema } from './entities/form.entity';

@Module({
	imports: [MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }])],
	controllers: [FormController],
	providers: [FormService, FormGateway],
	exports: [FormService],
})
export class FormModule {}

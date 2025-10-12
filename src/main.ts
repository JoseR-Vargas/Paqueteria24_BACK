import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Configuración de CORS
	app.enableCors({
		origin: true, // Permitir todos los orígenes en desarrollo
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});

	// Configuración global de validación
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		disableErrorMessages: process.env.NODE_ENV === 'production',
	}));

	// Puerto dinámico para diferentes entornos
	const port = process.env.PORT || 3000;
	
	await app.listen(port);
	
	console.log(`🚀 Paquetería24 Backend está corriendo en puerto ${port}`);
	console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
	console.log(`📦 MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/paqueteria24_dev'}`);
	console.log(`🔗 CORS habilitado para: ${process.env.ALLOWED_ORIGINS || 'localhost'}`);
}

bootstrap();

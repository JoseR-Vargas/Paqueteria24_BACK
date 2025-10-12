import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	try {
		console.log('🔄 Iniciando Paquetería24 Backend...');
		console.log(`📦 MongoDB URI configurado: ${process.env.MONGODB_URI ? '✅ Sí' : '❌ No'}`);
		
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
		
		console.log(`✅ Paquetería24 Backend está corriendo en puerto ${port}`);
		console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
		console.log(`� CORS habilitado`);
		console.log(`📍 Acceso: http://localhost:${port}`);
	} catch (error) {
		console.error('❌ Error al iniciar el servidor:', error.message);
		console.error('💡 Verifica:');
		console.error('   1. MongoDB URI en .env tiene la contraseña correcta');
		console.error('   2. IP está en la whitelist de MongoDB Atlas');
		console.error('   3. Usuario tiene permisos en la base de datos');
		process.exit(1);
	}
}

bootstrap();

import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
	cors: {
		origin: process.env.ALLOWED_ORIGINS
			? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
			: ['http://localhost:8080', 'https://paqueteria24.com', 'https://www.paqueteria24.com'],
		credentials: true,
	},
	namespace: '/notifications',
})
export class FormGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;

	private logger: Logger = new Logger('FormGateway');

	afterInit(server: Server) {
		this.logger.log('🔌 WebSocket Gateway inicializado');
	}

	handleConnection(client: Socket) {
		this.logger.log(`✅ Cliente conectado: ${client.id}`);
		
		// Enviar confirmación de conexión
		client.emit('connected', {
			message: 'Conectado al servidor de notificaciones',
			timestamp: new Date().toISOString(),
		});
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`❌ Cliente desconectado: ${client.id}`);
	}

	// Emitir evento cuando se crea un nuevo formulario
	emitNewForm(form: any) {
		this.logger.log(`📢 Emitiendo nueva consulta: ${form._id || form.id}`);
		this.server.emit('new_form', {
			type: 'new_form',
			data: form,
			timestamp: new Date().toISOString(),
		});
	}

	// Emitir evento cuando se elimina un formulario
	emitDeletedForm(formId: string) {
		this.logger.log(`🗑️ Emitiendo eliminación de consulta: ${formId}`);
		this.server.emit('form_deleted', {
			type: 'form_deleted',
			formId: formId,
			timestamp: new Date().toISOString(),
		});
	}
}

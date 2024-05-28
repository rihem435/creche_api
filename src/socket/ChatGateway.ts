// import {
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway(3001, { cors: { origin: '*' } })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     this.server.emit('userConnected', `Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     this.server.emit('userDisconnected', `Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: any): void {
//     this.server.emit('message', message)
//     console.log(`Client message: ${message}`);

//   }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(client: Socket, @MessageBody() room: string) {
//     client.join(room);
//     this.server.to(room).emit('userJoined', `${client.id} joined ${room}`);
//   }

//   @SubscribeMessage('sendMessageInRoom')
//   handleMessageInRoom(client: Socket, @MessageBody() payload: any) {
//     this.server.to(payload.room).emit('messageInRoom', { ...payload });
//   }
// }

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './chats.service';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.server.emit('userConnected', `Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.server.emit('userDisconnected', `Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: any): Promise<void> {
    const { text, senderId, receiverId } = message;
    await this.messagesService.create(text, senderId, receiverId);
    this.server.emit('message', message);

    console.log(`Client message: ${message}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, @MessageBody() room: string) {
    client.join(room);
    this.server.to(room).emit('userJoined', `${client.id} joined ${room}`);
  }

  @SubscribeMessage('sendMessageInRoom')
  async handleMessageInRoom(client: Socket, @MessageBody() payload: any) {
    const { text, senderId, receiverId, room } = payload;
    await this.messagesService.create(text, senderId, receiverId);
    this.server.to(room).emit('messageInRoom', { ...payload });
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, @MessageBody() users: { senderId: string, receiverId: string }): Promise<void> {
    const { senderId, receiverId } = users;
    const messages = await this.messagesService.findByUsers(senderId, receiverId);
    client.emit('allMessages', messages);
  }
}

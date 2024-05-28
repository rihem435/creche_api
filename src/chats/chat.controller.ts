import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Message } from './entities/chat.entity';
import { MessagesService } from './chats.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(
    @Body()
    createMessageDto: {
      text: string;
      senderId: string;
      receiverId: string;
    },
  ): Promise<Message> {
    const { text, senderId, receiverId } = createMessageDto;
    return this.messagesService.create(text, senderId, receiverId);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':senderId/:receiverId')
  async findByUsers(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,@Res() response
  ): Promise<Message[]> {
    const data = await this.messagesService.findByUsers(senderId, receiverId);
    return response.status(HttpStatus.OK).json({ data: data });
  }
}

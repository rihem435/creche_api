import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsMongoId()
  @IsNotEmpty()
  senderId: string;

  @IsMongoId()
  @IsNotEmpty()
  recipientId: string;
}

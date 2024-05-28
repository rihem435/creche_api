import { PartialType } from "@nestjs/swagger";
import { MessageDto } from "./create-chat.dto";

export class UpdateChatDto extends PartialType(MessageDto) {}

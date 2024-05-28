import { PartialType } from '@nestjs/swagger';
import { CreateActivitieschildDto } from './create-activitieschild.dto';

export class UpdateActivitieschildDto extends PartialType(CreateActivitieschildDto) {}

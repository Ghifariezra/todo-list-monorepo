import { IsString, IsOptional, IsEnum, IsNotEmpty, IsDateString, IsBoolean } from 'class-validator';

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum TaskStatus {
    ACTIVE = 'active',
    DEACTIVE = 'deactivated',
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus = TaskStatus.ACTIVE;

    @IsDateString()
    @IsOptional()
    schedule?: string;


    @IsBoolean()
    @IsOptional()
    reminder?: boolean = false;
}

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsDateString()
    @IsOptional()
    schedule?: string;

    @IsBoolean()
    @IsOptional()
    reminder?: boolean = false;
}

export class EmailPayloadDto {
    @IsNotEmpty()
    taskId: string[];

    @IsString()
    content: string;

    @IsBoolean()
    reminder: boolean
}
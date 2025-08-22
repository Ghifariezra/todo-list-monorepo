import { IsString, IsOptional, IsEnum, IsNotEmpty, IsDateString } from 'class-validator';

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
    status?: TaskStatus = TaskStatus.ACTIVE; // default

    @IsDateString()
    @IsOptional()
    schedule?: string; // format ISO string

}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsDateString()
    @IsOptional()
    schedule?: string;

}

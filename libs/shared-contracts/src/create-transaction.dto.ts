import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
    @Min(0.0001) // Prevent sending 0 or negative crypto
    amount!: number;

  @IsString()
    @IsNotEmpty() // Prevent empty strings
    destinationAddress!: string;
}
import { IsEmpty, IsNumber } from 'class-validator';
import { CreateCategoryReq, CreateSubCategoryReq } from '@proto/backoffice.pb';

export class CreateCategoryReqDto implements CreateCategoryReq {
  @IsEmpty()
  public readonly name: string;

  @IsEmpty()
  public readonly code: string;

  public readonly description: string;
}

export class CreateSubCategoryReqDto implements CreateSubCategoryReq {
  @IsNumber()
  public readonly categoryId: number;

  @IsEmpty()
  public readonly name: string;

  @IsEmpty()
  public readonly code: string;

  public readonly description: string;
}

import { Body, Controller, Inject, OnModuleInit, Post, Get, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCategoryReqDto } from '../models/dto/';
import {
  CategoryServiceClient,
  CATEGORY_SERVICE_NAME,
  CreateCategoryRes,
  CreateSubCategoryReq,
  ListCategoryRes,
  ListCategoryReq,
} from '@proto/backoffice.pb';

import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('BackOffice - Category')
@Controller({ path: 'bo' })
export class CategoryController implements OnModuleInit {
  private svc: CategoryServiceClient;

  @Inject(CATEGORY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
  }

  @Post('category')
  @ApiOperation({ summary: '카테고리 등록', description: '카테고리 등록' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '카테고리 명',
        },
        code: {
          type: 'string',
          description: '카테고리 코드',
        },
        description: {
          type: 'string',
          description: '카테고리 설명',
        },
      },
    },
  })
  public createCategory(@Body() req: CreateCategoryReqDto): Observable<CreateCategoryRes> {
    return this.svc.createCategory(req);
  }

  @Post('subcategory')
  @ApiOperation({ summary: '서브 카테고리 등록', description: '서브 카테고리 등록' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        categoryId: {
          type: 'number',
          description: '카테고리 아이디',
        },
        name: {
          type: 'string',
          description: '카테고리 명',
        },
        code: {
          type: 'string',
          description: '카테고리 코드',
        },
        description: {
          type: 'string',
          description: '카테고리 설명',
        },
      },
    },
  })
  public createSubCategory(@Body() req: CreateSubCategoryReq): Observable<CreateCategoryRes> {
    console.log(req);
    return this.svc.createSubCategory(req);
  }

  @ApiOperation({ summary: '카테고리 목록 조회', description: '카테고리 목록' })
  @ApiQuery({
    name: 'page',
    description: '페이지번호',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지당 조회수',
    type: 'number',
  })
  @ApiQuery({
    name: 'sort',
    description: '정렬기준',
    type: 'string',
  })
  @ApiQuery({
    name: 'order',
    description: '정렬순서',
    type: 'string',
  })
  @Get('categories')
  public listCategory(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ): Observable<ListCategoryRes> {
    const params: ListCategoryReq = {
      page: page || 1,
      limit: limit || 10,
      sort: sort || 'id',
      order: order || 'DESC',
    };
    return this.svc.listCategory(params);
  }
}

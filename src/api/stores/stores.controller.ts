import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator';


@ApiTags('Stores')
@Public()
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post('create')
  @ApiOperation({summary:'Create a new Store'})
  @ApiResponse({ status: 201, description: 'StoreEntity Muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 404, description: 'Ushbu Store allaqachon Mavjud' })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get('all')
  @ApiOperation({summary:'Retrieve all Stores'})
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Retrieve a store by ID'})
  @ApiParam({ name: 'id', description: 'The ID of the store', type: String })
  @ApiResponse({ status: 200, description: 'Details of the store.' })
  @ApiResponse({ status: 404, description: 'Storelar topilmadi' })
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a store by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the debtor to update',
    type: String,
  })
  @ApiResponse({status:404,description:'Yangilanadigan Store topilmadi'})
  @ApiResponse({status:200,description:'Storentity yangilandi'})
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a store by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the store to delete',
    type: String,
  })
  @ApiResponse({status:200,description:"StoreEntity o'chirildi"})
  @ApiResponse({status:404,description:"O'chiriladigan Store topilmadi"})
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}

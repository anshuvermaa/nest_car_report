import { Body, Controller,Param,Patch,Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../src/guards/auth.guard';
import { Serialize } from '../../src/interceptors/serialize.interceptor';
import { CurrentUser } from '../../src/users/decorators/current-user.decorator';
import { User } from '../../src/users/user.entity';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';
import { AdminGuard } from '../../src/guards/admin.guard';
import { Get, Query } from '@nestjs/common/decorators';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){

    }
    
    @Get()
    getEstimate(@Query() query:GetEstimateDto){
     return this.reportsService.createEstimate(query)
    }


    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body:CreateReportDto,@CurrentUser() user:User) {
    
        return this.reportsService.create(body,user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id:string,@Body() body:ApprovedReportDto){
        console.log('createReport',body)
      return this.reportsService.changeApproval(id,body.approved)
    }
}

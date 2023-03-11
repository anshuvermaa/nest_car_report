import { Transform } from 'class-transformer';
import{ 
    IsNumber,
    IsString,
    Min,
    Max,
    IsLatitude,
    IsLongitude
} from 'class-validator'

export class GetEstimateDto{
    @IsString()
    make:string;
    
    
    @IsString()
    model:string;
    
    @Transform(({value})=>parseInt(value))
    @IsNumber()
    @Min(1950)
    @Max(2024)
    year:number;
    
    @Transform(({value})=>parseFloat(value))
    @IsLongitude()
    lng:number;
    
    @Transform(({value})=>parseFloat(value))
    @IsLatitude()
    lat:number;
    
    
    @Transform(({value})=>parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage:number;

}
import{ 
    IsNumber,
    IsString,
    Min,
    Max,
    IsLatitude,
    IsLongitude
} from 'class-validator'

export class CreateReportDto{

    @IsNumber()
    @Min(0)
    @Max(100000)
    price: number;

    @IsString()
    make:string;
    
    
    @IsString()
    model:string;

    @IsNumber()
    @Min(1950)
    @Max(2024)
    year:number;

    @IsLongitude()
    lng:number;

    @IsLatitude()
    lat:number;


    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage:number;

}
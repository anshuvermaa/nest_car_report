import { rm } from "fs/promises";
import { join } from "path";
import { getConnection } from "typeorm";   
global.beforeEach(async ()=>{
    try{

        await rm(join(__dirname,'..','test.sqlite'))
    }catch(err){
        console.log('error',err)
    }
})


global.afterEach(async ()=>{
    const conn=await getConnection();
    await conn.close();
})
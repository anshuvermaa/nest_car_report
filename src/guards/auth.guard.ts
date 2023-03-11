import {CanActivate,ExecutionContext} from "@nestjs/common"

export class AuthGuard implements CanActivate{
    canActivate(context:ExecutionContext){
        const req=context.switchToHttp().getRequest()
        console.log(req.session)
        return req.session.userId
    }
}
import { createParamDecorator,ExecutionContext } from "@nestjs/common";

// A decorator is just a function which return some type of data
// below code is just a example of a decorator
// export const CurrentUser = createParamDecorator(
//     (data:any,context:ExecutionContext) =>{
//         // context-> it is a wrapper around the incoming  request
//         // data-> it will contain any data we will provide to our decorator as (@CurrentUser("anshu")) data="anshu"
//        
//         return "hi there"
//     }
// )


export const CurrentUser = createParamDecorator(
    (data:never,context:ExecutionContext) =>{
        // context it is a wrapper around the incoming  request
        const req = context.switchToHttp().getRequest();
        return req.currentUser;
    }
)
import {Test} from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { User } from './user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>

    beforeEach(async () => {
        // create a fake copy of user service
        const users: User[]=[];
        fakeUserService= {
            find: (email:String) => {
                const filteredUsers=users.filter(user=> user.email===email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) =>{
                const user = {id:Math.floor(Math.random()*999999),email,password} as User;
                users.push(user);
                return Promise.resolve(user);
            }
        };
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile()
        service = module.get<AuthService>(AuthService)
    })

    it('can create an instance of auth service', async () => {

        expect(service).toBeDefined()
    })

    it('creates a new user with a salted and hashed password',async () => {
        const user = await service.signup('asdf@asdf','asdf');

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use',async (done) => {
         await service.signup('asdf@asdf.com','asdf');
        try{

            await service.signup('asdf@asdf.com','asdf');
        }catch(err){
            done();
        }
    })

    it('throws if signin is called with an unused email',async (done) => {
        try{
            await service.signin('asdf@asdfhhghvgc','asdf');
        }catch(err){
            done();
        }
    })
    it("throws if an invalid password is provied",async(done)=>{
        await service.signup('asdf@asdfm.com','asdf')
        try{
            await service.signin('asdf@asdfm.com','asdfj');
        }catch(err){
            done();
        }
    } )
    it('returns a user if correct password is provided',async()=>{
        await service.signup('asdf@asdf.com','mypassword')
        const user=await service.signin('asdf@asdf.com','mypassword')
        expect(user).toBeDefined();
        // const user=await service.signup('asdf@asdf.com','mypassword');
        // console.log(user) 
    })
})

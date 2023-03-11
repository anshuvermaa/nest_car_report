import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authenication system', () => {
  let app: INestApplication;
// in forEach some kind of testing module is creatd

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('it handles a signup request', () => {
    const email='asdf@asd1.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email:email, password: 'mypass'})
      .expect(201)
      .then((res)=>{
        const {id,email}= res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email)
      })
  });

  it('signup as a new user then get the currently logged in user ',async () => {
    const email='asdf@asdf.com';
   const res=await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email,password:'asdf'})
    .expect(201)
    const cookie=res.get('Set-Cookie');
   const {body}= await request(app.getHttpServer())
    .get('/auth/whoami')
    .set('Cookie',cookie)

    expect(body.email).toEqual(email)
  })
});

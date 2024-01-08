const request = require("supertest")
const app = require("../src/app")
const User = require('../src/models/user')

const user1 = {
      name: "mallya",
      email : "mallya@gmail.com",
      password: 1234567
}

beforeEach(async()=>{
   await  User.deleteMany()
   await new User(user1).save()

})

afterEach(()=>{
    console.log('after each');
})

test("signup a new user", async()=>{
      await request(app).post('/users').send({
        name: "maxweel",
        email : "maxwell2@gmail.com",
        password : 1234567
      }).expect(200)
})

test("verifu auth", async () => {
    const response = await request(app).post("/users/login").send({
        email : "mallya@gmail.com",
      password: 1234567
    }).expect(400);

    console.log(response.body);
});

test("decline auth", async()=>{
    await request(app).post("/users/login").send({
        email : "mallya@gmail.com",
      password: 12345678
    }).expect(400)
})

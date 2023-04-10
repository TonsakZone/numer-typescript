const request = require('supertest');
const app = require('./endpoints');

describe('API-random path', ()=>{
    it('Bisection should query from mongo', async ()=>{
        const t = await request(app).post('/token')
        console.log(t._body.token);
        const token = t._body.token
        const Data = {
            pages: "bisections",
            Equation: "(x^2)-7",
            headers: {authorization: `${token}`}
          };
        console.log(Data);
          const res = await request(app)
            .post('/methods')
            // .send({ pages: "Bisection", Equation: "(x^4)-1"}, {headers: {authorization: `${token}`}});
            .send(Data)
            // expect(res.statusCode).toBe(201);
            // expect(res.body).toHaveProperty('_id');
            console.log(res.body);
            expect(res.body).toHaveProperty('Equation', "(x^2)-7");
            expect(res.body).toHaveProperty('XL', 0);
            expect(res.body).toHaveProperty('XR', 3);
    })
    it('OnePoint should query from mongo', async ()=>{
        const t = await request(app).post('/token')
        console.log(t._body.token);
        const token = t._body.token
        const Data = {
            pages: "onepoints",
            Equation: "(((2*x)+5)/2)^(1/3)",
            headers: {authorization: `${token}`}
          };
        console.log(Data);
          const res = await request(app)
            .post('/methods')
            // .send({ pages: "Bisection", Equation: "(x^4)-1"}, {headers: {authorization: `${token}`}});
            .send(Data)
            // expect(res.statusCode).toBe(201);
            // expect(res.body).toHaveProperty('_id');
            console.log(res.body);
            expect(res.body).toHaveProperty('Equation', "(((2*x)+5)/2)^(1/3)");
            expect(res.body).toHaveProperty('X', 0);
    })
    it('LinearRegression should query from mongo', async ()=>{
        const t = await request(app).post('/token')
        console.log(t._body.token);
        // console.log(t.data.token);
        const token = t._body.token
        const Data = {
            pages: "linearregressions",
            Equation: "option1",
            headers: {authorization: `${token}`}
          };
        console.log(Data);
          const res = await request(app)
            .post('/methods')
            // .send({ pages: "Bisection", Equation: "(x^4)-1"}, {headers: {authorization: `${token}`}});
            .send(Data)
            // expect(res.statusCode).toBe(201);
            // expect(res.body).toHaveProperty('_id');
            console.log(res.body);
            expect(res.body).toHaveProperty('Nsize', 9);
            expect(res.body).toHaveProperty('X', 65);
            expect(res.body).toHaveProperty('Matrix', [
                [
                  10,
                  5
                ],
                [
                  15,
                  9
                ],
                [
                  20,
                  15
                ],
                [
                  30,
                  18
                ],
                [
                  40,
                  22
                ],
                [
                  50,
                  30
                ],
                [
                  60,
                  35
                ],
                [
                  70,
                  38
                ],
                [
                  80,
                  43
                ]
              ]);
    })
})
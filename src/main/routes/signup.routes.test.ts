import request from 'supertest'
import app from '../config/app'

describe("Signup Routes", () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'savio',
        email: 'savio@mail.com',
        password: 'savio123',
        passwordConfirmation: 'savio123'

      })
      .expect(200)
  })
})

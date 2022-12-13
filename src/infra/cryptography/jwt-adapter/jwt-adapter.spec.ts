import jwt from "jsonwebtoken"
import { JwtAdapter } from "./jwt-adapter"

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

describe("jwt Adapter", () => {
  const makeSut = (): JwtAdapter => {
    const sut = new JwtAdapter('secret')

    return sut
  }

  test("Should call sign with correct values", async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret")
  })

  test("Should return a token on sign success", async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe("any_token")
  })
})

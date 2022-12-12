import jwt from "jsonwebtoken"
import { JwtAdapter } from "./jwt-adapter"

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
})

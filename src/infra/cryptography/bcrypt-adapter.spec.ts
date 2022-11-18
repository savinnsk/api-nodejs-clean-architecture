/* eslint-disable prefer-promise-reject-errors */
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<any> {
    return new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe(hash)
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare("any_value", "any_hash")
    expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash")
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const isValid = await sut.compare("any_value", "any_hash")
    expect(isValid).toBe(true)
  })
})

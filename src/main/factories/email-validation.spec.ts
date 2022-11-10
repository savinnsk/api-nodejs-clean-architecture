import { InvalidParamsError } from "../../presentation/errors"
import { EmailValidation } from "../../presentation/helpers/validators/email-validation"
import { EmailValidator } from "../../presentation/protocols/email-validator"

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation("email", emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation', () => {
  test("should return an error if EmailValidator returns false", () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: "any_email@mail.com" })
    expect(error).toEqual(new InvalidParamsError("email"))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: "any_email@mail.com" })
    expect(isValidSpy).toHaveBeenLastCalledWith('any_email@mail.com')
  })

  test('Should throw if emailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})

import { validateTitle } from '../src/pr-title-validator'

describe('validateTitle function', () => {
  const allowedTypes = ['feat', 'fix', 'chore']

  it('should throw an error for invalid title format', () => {
    const invalidTitle = 'Invalid Title Format'
    expect(() => validateTitle(invalidTitle, allowedTypes)).toThrow(`Bad PR title "${invalidTitle}": does not match conventional format`)
  })

  it('should throw an error for type not in allowedTypes', () => {
    const invalidTypeTitle = 'docs: Update documentation'
    expect(() => validateTitle(invalidTypeTitle, allowedTypes)).toThrow(
      `Bad PR title "${invalidTypeTitle}": actual type "docs" is not one of the allowed types: [feat, fix, chore]`
    )
  })

  it('valid title and type', () => {
    const validTitle = 'feat: Implement new feature'
    expect(() => validateTitle(validTitle, allowedTypes)).not.toThrow()
  })

  it('valid title with scope and breaking change', () => {
    const validTitle = 'feat(module)!: Implement breaking change!'
    expect(() => validateTitle(validTitle, allowedTypes)).not.toThrow()
  })

  it('should allow any type if allowedTypes is empty', () => {
    expect(() => validateTitle('randomtype: This is allowed', [])).not.toThrow()
  })
})

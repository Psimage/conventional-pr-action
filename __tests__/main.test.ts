import * as core from '@actions/core'
import * as github from '@actions/github'
import { main } from '../src/main'
import * as prTitleValidator from '../src/pr-title-validator'
import { validateTitle } from '../src/pr-title-validator'

jest.mock('@actions/core')
jest.mock('@actions/github')
jest.spyOn(prTitleValidator, 'validateTitle')

function mockInputParams(inputParams: Record<string, string>): void {
  jest.mocked(core.getInput).mockImplementation((name: string) => {
    return inputParams[name]
  })
}

function mockGithubContextPayload(prEventPayload: object): void {
  github.context.payload = prEventPayload
}

describe('main function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate PR title with allowed types', async () => {
    mockInputParams({ 'allowed-types': '["feat", "fix"]' })
    mockGithubContextPayload({ pull_request: { title: 'feat: New Feature' } })

    await main()

    expect(validateTitle).toHaveBeenCalledWith('feat: New Feature', [
      'feat',
      'fix'
    ])
  })

  it('should set workflow failure if title validation fails', async () => {
    mockInputParams({ 'allowed-types': '["feat"]' })
    mockGithubContextPayload({ pull_request: { title: 'invalid-title' } })

    await main()

    expect(core.setFailed).toHaveBeenCalledWith(
      'Bad PR title "invalid-title": does not match conventional format'
    )
  })

  it('should fail if action invoked by non pull_request event', async () => {
    mockInputParams({ 'allowed-types': '["feat"]' })
    mockGithubContextPayload({ pull_request: null })

    await main()

    expect(core.setFailed).toHaveBeenCalledWith(
      'The action expects to be triggered by a "pull_request" event.'
    )
  })
})

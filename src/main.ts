import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    await getPrTitle()
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }

}

async function getPrTitle(): Promise<string> {
  if (!github.context.payload.pull_request) {
    throw new Error('The action expects to be triggered by a "pull_request" event.')
  }

  const prContext = github.context.payload.pull_request

  core.info('Github full event context: ' + JSON.stringify(github.context))
  core.info('PR title from context: ' + github.context.payload.pull_request.title)

  const client = github.getOctokit(core.getInput('github-token'))
  const owner = prContext.base.user.login
  const repo = prContext.base.repo.name
  const prTitleFromAPI = (await client.rest.pulls.get({ owner, repo, pull_number: prContext.number })).data.title

  core.info('PR title from API: ' + prTitleFromAPI)

  return ''
}
import * as core from '@actions/core'
import * as github from '@actions/github'
import type { PullRequest } from '@octokit/webhooks-types'
import { validateTitle } from './pr-title-validator'
import { parseJsonList } from './input-parser'

export async function main(): Promise<void> {
  try {
    validateTitle(getPrTitle(), getAllowedTypes())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getPrTitle(): string {
  if (!github.context.payload.pull_request) {
    throw new Error('The action expects to be triggered by a "pull_request" event.')
  }

  const prContext = github.context.payload.pull_request as PullRequest
  const prTitle = prContext.title

  core.info(`PR title from context: ${prTitle}`)
  return prTitle
}

function getAllowedTypes(): string[] {
  return parseJsonList(core.getInput('allowed-types', { required: true }))
}

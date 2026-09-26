# cicd-demo

[![CI/CD](https://github.com/sicierto/cicd-demo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/sicierto/cicd-demo/actions/workflows/ci-cd.yml)

A crypto position-size calculator used to demonstrate CI/CD with GitHub Actions. Every pull request runs automated tests, `main` is protected so only tested changes can merge, and every merge to `main` deploys automatically.

- **Pipeline deployment (GitHub Pages):** https://sicierto.github.io/cicd-demo/
- **Production:** https://sicierto.com/tools/position-size-calculator (currently updated manually from this repo)

## How the pipeline works

1. **Trigger:** a push to `main` or any pull request starts the workflow.
2. **Test (CI):** GitHub Actions installs Node.js 22 and runs `npm test`, which runs the unit tests for the position-sizing math.
3. **Deploy (CD):** only on `main`, and only after tests pass, the `public/` folder is published to GitHub Pages.

Pull requests are tested but never deployed. If tests fail, the deploy step is skipped and the live site keeps the last working version.

## Branch protection

The `protect-main` ruleset on the default branch enforces:

- A pull request is required before merging. Required approvals are set to 0 because this repo has a single maintainer; a team repo should require at least 1 review.
- The `test` status check must pass before merging.
- Force pushes and deletion of `main` are blocked.
- No one can bypass these rules, including repository admins.

**Verified:** pull request #1 introduced a deliberate bug (risk divided by 10 instead of 100). The `test` check failed, the merge was blocked, and the pull request was closed without merging.

## Project structure

| Path | Purpose |
| --- | --- |
| `public/index.html` | The calculator page that gets deployed |
| `public/position.js` | Position-sizing logic, shared by the page and the tests |
| `position.test.js` | Unit tests using Node's built-in test runner |
| `package.json` | Defines the `npm test` command |
| `.github/workflows/ci-cd.yml` | Pipeline definition |

## Run tests locally

Requires Node.js 20 or later. From the repo folder, run `npm test`.

## Making changes

1. Edit a file on GitHub and choose **Create a new branch for this commit and start a pull request**.
2. Open the pull request and wait for the `test` check to pass.
3. Merge the pull request. The deploy runs automatically.

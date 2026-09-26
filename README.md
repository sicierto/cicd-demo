# cicd-demo

[![CI/CD](https://github.com/sicierto/cicd-demo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/sicierto/cicd-demo/actions/workflows/ci-cd.yml)

A minimal project for learning CI/CD with GitHub Actions. Every push runs automated tests, and every change that passes on `main` deploys to GitHub Pages automatically.

**Live site:** https://sicierto.github.io/cicd-demo/

## How the pipeline works

1. **Trigger:** a push to `main` or any pull request starts the workflow.
2. **Test (CI):** GitHub Actions installs Node.js and runs `npm test`.
3. **Deploy (CD):** if tests pass and the change is on `main`, the `public/` folder deploys to GitHub Pages.

Pull requests are tested but never deployed. If tests fail, the deploy step is skipped and the live site keeps the last working version.

## Project structure

| Path | Purpose |
| --- | --- |
| `math.js` | Example function under test |
| `math.test.js` | Unit test using Node's built-in test runner |
| `public/index.html` | The page that gets deployed |
| `.github/workflows/ci-cd.yml` | Pipeline definition |

## Making changes

1. Edit a file and choose to create a new branch and pull request.
2. Wait for the `test` check to pass, then merge.

The `main` branch is protected: pull requests can't merge until the `test` check passes.

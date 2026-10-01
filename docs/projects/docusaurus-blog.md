# Docusaurus Learning Journal

This project is my personal learning journal and portfolio for the DevSecOps training at Developer Akademie. It is based on a Docusaurus template, which I personalized, configured and deployed to GitHub Pages.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
  - [Repository setup](#repository-setup)
  - [Configuration in docusaurus.config.ts](#configuration-in-docusaurusconfigts)
  - [Environment variable](#environment-variable)
  - [Navbar and footer](#navbar-and-footer)
  - [README changes](#readme-changes)
  - [GitHub Pages deployment](#github-pages-deployment)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/vadim-cebanu/learning-journal"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

1. Clone the repository: `git clone git@github.com:vadim-cebanu/learning-journal.git`
2. Install the dependencies: `npm install`
3. Copy `example.env` to `.env` and adjust the values if needed
4. Start the development server: `npm start`
5. Build the project: `npm run build`

## Description

### Repository setup

I created my own repository from the Developer Akademie template using "Use this template". All changes were made on the feature branch `setup-blog`, split into several small commits. The branch will be merged into `main` via a pull request after the project is approved.

### Configuration in docusaurus.config.ts

- Changed the `title` to reflect that this is my learning journal
- Changed the `tagline` to a short subtitle describing the page
- Updated the `url` so that it matches my GitHub username

### Environment variable

- Added `GIT_REPOSITORY_URL` to `example.env`
- Created a TypeScript variable that reads this value from the environment or falls back to a default value, following the existing `blogEnabled` variable
- Used this variable for the `editUrl` in the docs and blog configuration

The `.env` file itself is not committed to the repository.

### Navbar and footer

- Changed the navbar `title`
- Replaced the default favicon/logo with my own image
- The GitHub link in the navbar now uses the repository URL variable
- Added a link to the projects page (`/docs/projects`) in the Docs column of the footer
- Removed the Community column from the footer
- In the More column, the GitHub link now points to my repository, and a link labeled "Template" points to the template repository
- Personalized the copyright message and extended it with "extended from the developer-akademie-starter"

### README changes

- Replaced the Deployment section with a short description of the automatic deployment via GitHub Actions
- Updated all references to the Deployment section
- Removed the Contributing section

### GitHub Pages deployment

In the repository settings under **Settings → Pages → Build and deployment**, I set the source to **GitHub Actions**. A prepared GitHub Actions workflow builds the website and deploys it to GitHub Pages whenever a commit is pushed to the `main` branch.

## Further References

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
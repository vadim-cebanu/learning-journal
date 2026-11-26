# Vadim Cebanu – DevSecOps Portfolio

[![CI/CD Workflow](https://github.com/vadim-cebanu/portfolio/actions/workflows/main.yml/badge.svg)](https://github.com/vadim-cebanu/portfolio/actions/workflows/main.yml)

**Live site:** https://vadim-cebanu.github.io/portfolio/

## Table of Contents

- [Description](#description)
  - [Features](#features)
  - [Tech stack](#tech-stack)
- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [How to start](#how-to-start)
- [Usage](#usage)
  - [Environment variables](#environment-variables)
  - [Changing the portfolio content](#changing-the-portfolio-content)
  - [Changing colors, font and layout](#changing-colors-font-and-layout)
  - [Adding a new section](#adding-a-new-section)
  - [Project documentation (docs)](#project-documentation-docs)
- [Build](#build)
- [Deployment](#deployment)
  - [Option 1: GitHub Pages (CI/CD)](#option-1-github-pages-cicd)
  - [Option 2: Docker + NGINX](#option-2-docker--nginx)
  - [Option 3: NGINX on your own server](#option-3-nginx-on-your-own-server)
- [CI/CD workflows](#cicd-workflows)
- [Project structure](#project-structure)
- [Code conventions](#code-conventions)
- [Security](#security)
- [License](#license)

## Description

This repository contains my personal **DevSecOps portfolio**, built with
[Docusaurus](https://docusaurus.io/), **React** and **TypeScript** as part of the
DevSecOps training at Developer Akademie.

The repository has two purposes:

1. **Portfolio homepage** – a one-page portfolio based on a Figma design with the
   sections _Header_, _Hero_, _My skills_, _My project highlights_, _Contact_ and _Footer_.
2. **Project documentation** – the Docusaurus docs contain detailed documentation for
   each of my projects (e.g. V-Server Setup, OWASP Juice Shop, Conduit Container,
   Truck Signs API). The project cards on the homepage link directly to these pages.

Every change is developed in a feature branch, merged via pull request and deployed
automatically to GitHub Pages.

### Features

- Header that hides on scroll down and reappears on scroll up, with a burger menu on mobile
- Hero section with profile image and short introduction
- Skills as 3D flip cards on desktop and as a swipeable carousel on mobile
- Reveal-on-scroll animations (IntersectionObserver), respecting `prefers-reduced-motion`
- Project highlights with a project list on desktop and stacked cards on mobile
- Contact section with e-mail and profile link
- Footer with animated scroll-to-top button and legal notice page
- Fully typed React components (no `any`), CSS modules per component
- Self-hosted font (no requests to Google Fonts)
- Automatic deployment to GitHub Pages and an alternative Docker + NGINX setup

### Tech stack

| Area             | Technology                                    |
| ---------------- | --------------------------------------------- |
| Framework        | Docusaurus 3                                  |
| UI               | React, TypeScript, CSS Modules                |
| Font             | Quicksand via `@fontsource/quicksand`         |
| CI/CD            | GitHub Actions, GitHub Pages                  |
| Container        | Docker (multi-stage build), NGINX             |
| Dependency updates | Dependabot                                  |

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) **24** (the version used in CI and Docker)
- npm (comes with Node.js)
- Git
- _Optional:_ Docker, for the container deployment

> [!NOTE]
> Check your Node.js version with `node -v`. Older versions may fail to install the dependencies.

### How to start

```bash
# 1. Clone the repository
git clone https://github.com/vadim-cebanu/portfolio.git
cd portfolio

# 2. Create your local configuration from the template
cp example.env .env

# 3. Install dependencies
npm ci

# 4. Start the development server
npm start
```

The site opens at **http://localhost:3000/portfolio/** and reloads automatically when you change a file.

## Usage

### Environment variables

The site configuration is read from environment variables in `docusaurus.config.ts`.
Locally they are loaded from `.env`, in CI from `example.env`.

> [!IMPORTANT]
> `.env` is listed in `.gitignore` and must **never** be committed. `example.env` is public – put only non-sensitive values (URLs, names) into it.

| Variable             | Example                                     | Description                                                             |
| -------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `DEPLOYMENT_URL`     | `https://vadim-cebanu.github.io`            | Domain where the site is hosted                                         |
| `BASE_URL`           | `/portfolio/`                               | Path under the domain. Use `/` for a custom domain or the Docker image  |
| `DEPLOYMENT_BRANCH`  | `main`                                      | Branch that is deployed                                                 |
| `GITHUB_ORG`         | `vadim-cebanu`                              | GitHub user or organization                                             |
| `GITHUB_PROJECT`     | `portfolio`                                 | Repository name                                                         |
| `GIT_REPOSITORY_URL` | `https://github.com/vadim-cebanu/portfolio` | Used for "Edit this page" links in the docs                             |
| `BLOG_ENABLED`       | `false`                                     | _Optional._ Enables the Docusaurus blog (default: disabled)             |

**Example – deploy under your own repository name:** change `BASE_URL` and
`GITHUB_PROJECT` to your repository name, `GITHUB_ORG` to your GitHub username, and
update `GIT_REPOSITORY_URL`.

**Example – deploy to a custom domain** (e.g. `portfolio.example.com`): set
`DEPLOYMENT_URL=https://portfolio.example.com` and `BASE_URL=/`, then add a file
`static/CNAME` containing the domain.

> [!TIP]
> After changing `.env`, restart `npm start` – environment variables are only read at startup.

### Changing the portfolio content

All texts, links and images of the homepage are stored in **one file**:
[`src/data/portfolio.ts`](src/data/portfolio.ts). The components only define the layout,
so you never have to touch them to change content.

| What you want to change                 | Where in `src/data/portfolio.ts`                   |
| --------------------------------------- | -------------------------------------------------- |
| Name, job title, description, photo     | `heroData`                                         |
| Navigation links                        | `navLinks`                                         |
| Skills (icon + "how I used this skill") | `skillsData`                                       |
| Projects shown on the homepage          | `projectsData`, tags in `projectTags`              |
| Link "see more projects"                | `moreProjectsUrl`                                  |
| Contact texts, e-mail and profile link  | `contactData`                                      |
| Footer name and legal notice link       | `footerData`                                       |

**Add a skill:** put the icons into `static/img/skills/` (desktop) and
`static/img/mobile/` (mobile) and add an entry to `skillsData`:

```ts
{
  name: 'Kubernetes',
  icon: '/img/skills/kubernetes.svg',
  iconMobile: '/img/mobile/kubernetes.svg', // optional
  points: ['Deployments and services', 'Helm charts'],
},
```

The mobile carousel automatically groups three skills per slide.

**Add a project:** put a preview image into `static/img/projects/`, write the
documentation in `docs/projects/<project-name>/README.md` and add an entry to `projectsData`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  image: '/img/projects/my-project.svg',
  imageAlt: 'Screenshot of my project',
  description: 'What the project does and what I learned.',
  tags: [projectTags.container, projectTags.cicd],
  docsUrl: '/docs/projects/my-project',
  githubUrl: 'https://github.com/vadim-cebanu/my-project',
},
```

The order of the entries is the order on the page.

> [!TIP]
> `npm run build` fails if a `docsUrl` points to a page that does not exist, so broken links are caught before they reach the live site.

**Change the profile photo:** replace `static/img/profile.png` (recommended ratio 11:12,
e.g. 880 × 960 px) or change `heroData.imageSrc`.

**Legal notice:** edit [`src/pages/legal-notice.md`](src/pages/legal-notice.md).

> [!NOTE]
> Websites in Germany that are not purely private usually need a legal notice (Impressum, § 5 DDG). Check which information applies to you before publishing.

### Changing colors, font and layout

Global design tokens are defined as CSS variables in [`src/css/custom.css`](src/css/custom.css):

| Variable                | Used for                                   |
| ----------------------- | ------------------------------------------ |
| `--portfolio-primary`   | Header and Hero background                 |
| `--portfolio-accent`    | Project section background, buttons        |
| `--portfolio-dark`      | Dark sections (Skills, Contact, Footer)    |
| `--portfolio-card`      | Card and container backgrounds             |
| `--points-background`   | Back side of the skill flip cards          |
| `--portfolio-light`     | Text color                                 |
| `--portfolio-font`      | Font family                                |
| `--portfolio-container` | Maximum content width of all sections      |

Changing a value updates every section at once. Component-specific styles live in the
`*.module.css` file next to each component. The `--ifm-*` variables in the same file
control the colors of the documentation pages.

### Adding a new section

1. Create a folder in kebab-case, e.g. `src/components/my-section/`.
2. Add `index.tsx` (component in PascalCase, props typed with an interface) and
   `my-section.module.css`.
3. Add the content to `src/data/portfolio.ts`.
4. Render the component in `src/pages/index.tsx` and, if needed, add a link to `navLinks`
   (the section needs a matching `id`).

### Project documentation (docs)

The project documentation is written in Markdown in the `docs/` folder. Each project
has its own folder in `docs/projects/` with a `README.md` and a `_category_.yaml`
(sidebar label and position). The sidebar is generated automatically (`sidebars.ts`).

## Build

```bash
npm run typecheck   # TypeScript check (no type errors, no implicit any)
npm run build       # creates the static site in ./build
npm run serve       # serves ./build locally – exactly what gets deployed
```

> [!TIP]
> Always test with `npm run build && npm run serve` before pushing. The production build minifies CSS and JS, and some issues only appear there – not with `npm start`.

## Deployment

### Option 1: GitHub Pages (CI/CD)

This is the main deployment. Every push to `main` (i.e. every merged pull request)
triggers the workflow `.github/workflows/main.yml`, which builds the site and deploys it
to GitHub Pages: **https://vadim-cebanu.github.io/portfolio/**

One-time setup in your own fork:

1. **Settings → Pages → Source:** select **GitHub Actions**.
2. Adjust the values in `example.env` (see [Environment variables](#environment-variables)).
3. Push to `main` – the site is deployed automatically. Progress is visible in the **Actions** tab.

> [!WARNING]
> `BASE_URL` must match the repository name (e.g. `/portfolio/` for `github.com/<user>/portfolio`). If you rename the repository, update `BASE_URL`, `GITHUB_PROJECT` and `GIT_REPOSITORY_URL` in `example.env` – otherwise CSS, JavaScript and images return 404.

### Option 2: Docker + NGINX

The `Dockerfile` uses a multi-stage build: Node.js builds the static site, then only the
build output is copied into a small NGINX image. Inside the container the site is served
from the root (`BASE_URL=/`).

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run --rm -p 8080:80 portfolio
```

Open **http://localhost:8080**.

For a server with a real domain, pass the values as build arguments:

```bash
docker build \
  --build-arg DEPLOYMENT_URL=https://portfolio.example.com \
  --build-arg BASE_URL=/ \
  -t portfolio .

docker run -d --restart unless-stopped -p 80:80 --name portfolio portfolio
```

> [!CAUTION]
> Do not remove `.env` from `.dockerignore`. Without it, `COPY . .` would copy your local `.env` into the image – and its `BASE_URL` would override the Docker value, breaking all asset paths.

### Option 3: NGINX on your own server

1. Set `DEPLOYMENT_URL` and `BASE_URL=/` in `.env` and run `npm run build`.
2. Copy the build output to the server:

   ```bash
   rsync -avz --delete build/ user@your-server:/var/www/portfolio/
   ```

3. Create an NGINX site, e.g. `/etc/nginx/sites-available/portfolio`:

   ```nginx
   server {
       listen 80;
       server_name portfolio.example.com;

       root /var/www/portfolio;
       index index.html;

       location / {
           try_files $uri $uri/ $uri.html /404.html;
       }
   }
   ```

4. Enable it and reload NGINX:

   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

5. Add HTTPS, e.g. with Certbot: `sudo certbot --nginx -d portfolio.example.com`.

## CI/CD workflows

| File                                   | Purpose                                                                                         |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `.github/workflows/main.yml`           | Main CI/CD workflow: runs on pull requests and pushes to `main`, builds the site and calls the deploy workflow |
| `.github/workflows/deploy.yaml`        | Reusable workflow: installs dependencies, creates `.env` from `example.env`, builds and uploads the site; deploys to GitHub Pages only from the default branch |
| `.github/workflows/create-pr.yaml`     | Creates or updates a pull request automatically when a feature branch is pushed               |
| `.github/workflows/check-open-pr.yaml` | Checks that an open pull request exists for a feature branch                                  |
| `.github/dependabot.yml`               | Dependabot configuration for automatic dependency update pull requests                         |

On a pull request the site is only **built** (so broken builds are caught before merging);
the **deployment** runs only after the merge to `main`.

## Project structure

```text
.
├── .github/
│   ├── dependabot.yml              # Automatic dependency updates
│   └── workflows/                  # GitHub Actions (see "CI/CD workflows")
├── docs/                           # Project documentation (Markdown)
│   └── projects/                   # One folder per project (README.md + _category_.yaml)
├── src/
│   ├── components/                 # React components, one folder per component (kebab-case)
│   │   ├── contact/                # Contact section (index.tsx + contact.module.css)
│   │   ├── footer/                 # Footer with scroll-to-top button (index.tsx + footer.module.css)
│   │   ├── github-link-admonition/ # Admonition with a GitHub link, used in the docs (index.tsx)
│   │   ├── header/                 # Navigation, hide on scroll, burger menu (index.tsx + header.module.css)
│   │   ├── hero/                   # Hero section (index.tsx + hero.module.css)
│   │   ├── my-skills/              # Skill flip cards and mobile carousel (index.tsx + my-skills.module.css)
│   │   └── project-highlights/     # Project list and cards (index.tsx + project-highlights.module.css)
│   ├── css/
│   │   └── custom.css              # Global styles, design tokens, font import
│   ├── data/
│   │   └── portfolio.ts            # All portfolio content (texts, links, images)
│   ├── hooks/
│   │   └── use-reveal.ts           # Hook for reveal-on-scroll animations
│   └── pages/
│       ├── index.tsx               # Homepage – puts all sections together
│       ├── index.module.css        # Homepage layout styles
│       └── legal-notice.md         # Legal notice (Impressum) page
├── static/                         # Files copied 1:1 into the build
│   ├── .nojekyll                   # Tells GitHub Pages not to process the site with Jekyll
│   └── img/
│       ├── contact/                # Contact icons
│       ├── mobile/                 # Skill icons for mobile
│       ├── projects/               # Project preview images
│       ├── skills/                 # Skill icons for desktop
│       ├── tags/                   # Technology tags for project cards
│       ├── arrow.svg               # Scroll-to-top arrow
│       └── profile.png             # Profile photo
├── .dockerignore                   # Files excluded from the Docker build context
├── .gitignore                      # Files excluded from Git (node_modules, build, .env, …)
├── Dockerfile                      # Multi-stage build: Node.js build + NGINX runtime
├── LICENSE                         # License of the repository
├── README.md                       # This file
├── babel.config.js                 # Babel configuration used by Docusaurus
├── docusaurus.config.ts            # Docusaurus configuration (reads the environment variables)
├── example.env                     # Template for .env, also used by the CI pipeline
├── package.json                    # Dependencies and npm scripts
├── package-lock.json               # Locked dependency versions (used by npm ci)
├── sidebars.ts                     # Sidebar configuration of the docs
└── tsconfig.json                   # TypeScript configuration
```

## Code conventions

- React components live in `src/components/<kebab-case-name>/index.tsx`.
- Component names use **PascalCase** (e.g. `ProjectHighlights`).
- Each component has its own CSS module named after it (e.g. `project-highlights.module.css`).
- All props are typed with TypeScript interfaces – **no `any`** in the code base.
- Content is separated from layout: data in `src/data/portfolio.ts`, layout in the components.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `style:`, `chore:`, `docs:`, `refactor:`).
- Every change is developed in a feature branch and merged via pull request.

## Security

- No passwords, tokens, SSH keys or IP addresses are stored in this repository.
- Local configuration lives in `.env`, which is listed in `.gitignore` and `.dockerignore`.
- `example.env` only contains public, non-sensitive values (URLs and names).
- The font is self-hosted, so no visitor data is sent to Google Fonts.
- The NGINX base image is pinned to a fixed version instead of `latest`.
- Dependencies are kept up to date with Dependabot.

## License

See [LICENSE](LICENSE).
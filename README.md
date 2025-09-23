<p align="center">
    <img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/96/external-readme-is-a-easy-to-build-a-developer-hub-that-adapts-to-the-user-logo-regular-tal-revivo.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">POWERHOUSE-GYM</h1></p>
<p align="center">
	<img src="https://img.shields.io/github/license/peterodero561/powerhouse-fitness-hub?style=default&logo=opensourceinitiative&logoColor=white&color=56602c" alt="license">
	<img src="https://img.shields.io/github/last-commit/peterodero561/powerhouse-fitness-hub?style=default&logo=git&logoColor=white&color=56602c" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/peterodero561/powerhouse-fitness-hub?style=default&color=56602c" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/peterodero561/powerhouse-fitness-hub?style=default&color=56602c" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

<code>❯ PowerHouse Gym is a clean, mobile-first landing site for a fitness gym that highlights events, membership plans, and member testimonials. The app includes an interactive hero, event modals, plan cards, and a contact/links area for WhatsApp and social channels. Built with Vite, React, TypeScript, shadcn-ui and Tailwind CSS — ready to deploy to Vercel, Node JS backend and Postgres Database.</code>

##  Features

<code>

- **Responsive, mobile-first layout** — Built with Tailwind CSS to look great on phones and desktops.
- **Hero section with CTA** — Large, engaging hero with call-to-action button and background image.
- **Navbar with mobile menu** — Desktop links and a collapsible mobile menu (hamburger) for small screens.
- **Top-rated reviewer scroller** — Horizontal, touch-friendly scroller showcasing top reviews.
- **Events carousel & modal** — Event highlight card with next/previous controls and a modal that shows full event details (location, prize, signup link).
- **Membership plans** — Plan cards with normalized features, pricing, period, and a “POPULAR” badge option.
- **Reviews carousel** — Member testimonial card with star ratings and prev/next controls.
- **Contact hub** — Contact section with WhatsApp, TikTok, and email links; easy user conversion.
- **API-driven content** — Fetches events, plans, and reviews from backend endpoints (`/api/events`, `/api/plans`, `/api/reviews`, `/api/reviews/top`) so content is dynamic.
- **Loading & error handling** — Loading spinner while data fetches and graceful fallback if data is missing.
- **Accessible modals & controls** — Keyboard- and screen-reader-friendly UI where applicable.
- **Clean component structure** — Vite + React + TypeScript project with components that are easy to extend.
</code>

---

##  Project Structure

```sh
└── powerhouse-fitness-hub/
    ├── README.md
    ├── bun.lockb
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── powerhouse-backend
    │   ├── .env
    │   ├── config
    │   ├── controllers
    │   ├── models
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── routes
    │   └── server.js
    ├── public
    │   ├── __Iphone-spinner-1.gif
    │   ├── events
    │   ├── faviconn.ico
    │   ├── icons8-person-48.png
    │   ├── icons8-weightlifting-64.png
    │   ├── placeholder.svg
    │   └── robots.txt
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── components
    │   ├── hooks
    │   ├── index.css
    │   ├── lib
    │   ├── main.tsx
    │   ├── pages
    │   └── vite-env.d.ts
    ├── start_frontend_server
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---
##  Getting Started

###  Prerequisites

Before getting started with powerhouse-fitness-hub, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript, JavaScipt
- **Package Manager:** Npm


###  Installation

Install powerhouse-fitness-hub using the following method:

**Build from source:**

1. Clone the powerhouse-fitness-hub repository:
```sh
❯ git clone https://github.com/peterodero561/powerhouse-fitness-hub
```

2. Navigate to the project directory(frontend):
```sh
❯ cd powerhouse-fitness-hub
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

4. Navigate to project backend directory:
```sh
❯ cd powerhouse-backend
```

5. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```


###  Usage
Run powerhouse-fitness-hub frontend using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```
Run powerhouse-fitness-hub backend in another terminal using the following command:
```sh
❯ node server.js
```

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/peterodero561/powerhouse-fitness-hub/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/peterodero561/powerhouse-fitness-hub/issues)**: Submit bugs found or log feature requests for the `powerhouse-fitness-hub` project.
- **💡 [Submit Pull Requests](https://github.com/peterodero561/powerhouse-fitness-hub/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/peterodero561/powerhouse-fitness-hub
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/peterodero561/powerhouse-fitness-hub/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=peterodero561/powerhouse-fitness-hub">
   </a>
</p>
</details>

---

##  Acknowledgments

- Thanks to Loveable AI, Pixabay, and Icons8 for resources and assets used in this project.

---
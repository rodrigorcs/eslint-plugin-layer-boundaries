# ESLint Plugin: Layer Boundaries

Enforce clean architectural layering rules in your Node/TypeScript projects. This plugin checks your **Controllers**, **Actions**, **Services**, and **Repositories** so they don’t violate layer constraints in your software architecture (e.g., skipping layers or importing from forbidden layers).

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Add the plugin](#1-add-the-plugin)
  - [2. Use the recommended config](#2-use-the-recommended-config)
  - [3. Or enable the rule manually](#3-or-enable-the-rule-manually)
- [Rules](#rules)
  - [no-controller-anti-patterns](#no-controller-anti-patterns)
  - [no-action-anti-patterns](#no-action-anti-patterns)
  - [no-service-anti-patterns](#no-service-anti-patterns)
  - [no-repository-anti-patterns](#no-repository-anti-patterns)
- [Local Development](#local-development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This plugin keeps your app’s **controllers, actions, services, and repositories** in separate layers:

- **Controller**: Cannot import multiple services or repositories. Only import actions or a single service.
- **Action**: Cannot import controllers, other actions or repositories. Only import services.
- **Service**: Cannot import controllers, actions, other services or multiple repositories. Only import a single repository.
- **Repository**: Cannot import controllers, actions, services or other repositories.

---

## Installation

```bash
npm install --save-dev eslint-plugin-layer-boundaries
```

Or:

```bash
yarn add --dev eslint-plugin-layer-boundaries
```

Make sure you already have ESLint in your project as well.

---

## Usage

### 1. Add the plugin

In your `.eslintrc.js` (or `.eslintrc.json`):

```ts
module.exports = {
  plugins: [
    // ...
    'layer-boundaries',
  ],
  // ...
}
```

### 2. Use the recommended config

An easy way to get started is to extend our recommended rules, which:

- Enforce cross-layer constraints out of the box
- Ignore `tests/` folders and `.test.*` / `.spec.*` files automatically

```ts
module.exports = {
  extends: ['plugin:layer-boundaries/recommended'],
}
```

That’s it! ESLint will now flag any cross-layer imports.

### 3. ...Or enable the rule manually

If you prefer to pick and choose:

```ts
module.exports = {
  plugins: ['layer-boundaries'],
  rules: {
    'layer-boundaries/no-controller-anti-patterns': 'warn',
    'layer-boundaries/no-action-anti-patterns': 'warn',
    'layer-boundaries/no-service-anti-patterns': 'warn',
    'layer-boundaries/no-repository-anti-patterns': 'warn',
  },
}
```

---

## Rules

### `no-controller-anti-patterns`

**Enforces** that **controller** files do **not**:

- Import multiple **services** (cross-domain operations must go through an action)
- Import **repositories** (they must go through a service).

### `no-action-anti-patterns`

**Enforces** that **action** files do **not**:

- Import **controllers**.
- Import other **actions** directly.
- Import **repositories** directly.

### `no-service-anti-patterns`

**Enforces** that **service** files do **not**:

- Import **controllers**
- Import **actions**.
- Import other **services**.
- Import multiple **repositories** (each domain must use it's own service, cross-domain operations must go through an action)

### `no-repository-anti-patterns`

**Enforces** that **repository** files do **not**:

- Import **controllers**.
- Import **actions**.
- Import **services**.
- Import other **repositories**.

Each rule identifies if the current file is a **controller**, **action**, **service**, or **repository** by scanning its path/filename. If the file belongs to that layer, the rule checks the imports against the allowed or forbidden layers and reports errors if the constraints are violated.

> [!NOTE]
> If the analyzed path is at the same layer as the import path and it has some common keywords for shared utils (e.g. 'common', 'utils', 'base', etc.), it will skip the analysis

---

## Local Development

If you want to **develop** or **test** this plugin **locally** inside another project:

1. **Clone** or **fork** this repo:

```bash
git clone https://github.com/rodrigorcs/eslint-plugin-layer-boundaries.git
cd eslint-plugin-layer-boundaries
```

2. **Install** dependencies and **build**:

```bash
yarn install
yarn build
```

3. **Link** it globally:

```bash
yarn link
```

4. In your **target project** (where you want to use the plugin):

```bash
cd /path/to/your-project
yarn link "eslint-plugin-layer-boundaries"
```

5. In that project’s **.eslintrc**:

```ts
module.exports = {
  extends: ['plugin:layer-boundaries/recommended'],
  plugins: ['layer-boundaries'],
}
```

6. **Run** ESLint there. If everything is configured properly, you’ll see any layering rule violations.

To **unlink** later:

```bash
# In your target project

yarn unlink "eslint-plugin-layer-boundaries"
```

```bash
# In the plugin folder

yarn unlink
```

---

## Contributing

1. **Open an Issue** for bugs or feature requests.
2. **Fork** this repo and create a feature branch for your changes.
3. **Build & Test**:

```bash
yarn build
```

4. **Push** your branch and open a Pull Request.

All contributions to improve layering rules or add new configuration options are welcome!

---

## License

[MIT License](LICENSE). Feel free to use, modify, and distribute. Enjoy building cleaner architecture!

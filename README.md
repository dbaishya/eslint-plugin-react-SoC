![npm](https://img.shields.io/npm/v/eslint-plugin-react-soc)
![npm](https://img.shields.io/npm/dw/eslint-plugin-react-soc)
![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/dbaishya/eslint-plugin-react-SoC/ci.yml)
![NPM](https://img.shields.io/npm/l/eslint-plugin-react-soc)

# eslint-plugin-react-soc

An eslint plugin that ensures separation of business logic from presentation logic in React functional components.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
# npm
npm i eslint --save-dev

# yarn
yarn add eslint --dev
```

Next, install `eslint-plugin-react-soc`:

```sh
#npm
npm install eslint-plugin-react-soc --save-dev

#yarn
yarn add eslint-plugin-react-soc --dev
```

## Usage

Add `react-soc` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["react-soc"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "react-soc/separation-of-concerns": "error"
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                           | Description                                                   |
| :------------------------------------------------------------- | :------------------------------------------------------------ |
| [separation-of-concerns](docs/rules/separation-of-concerns.md) | rule to warn mixing of business logic with presentation logic |

<!-- end auto-generated rules list -->

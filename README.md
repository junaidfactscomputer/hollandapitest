## Requirements

Make sure that you have the last stable [NodeJS](https://nodejs.org/en/download/) and `yarn` version.

- Do not delete the `yarn.lock file`

## Install

Navigate to the project root folder using terminal and install the dependencies.

```js
yarn || npm install;
```

## Start

After the installation is complete, you can launch dev server by running.

```js
yarn dev || npm run dev
```

This starts a local webserver at `http://localhost:3000` and auto detect file changes:

## Build

```js
yarn build || npm run build
```

## Folder structure

```ts
bazar-react/
├── public/
|   └── assets/
|       └── images/
├── pages/
    ├── address
    ├── admin
    ├── orders
    ├── payment-methods
    ├── product
    ├── profile
    ├── shops
    ├── support
    ├── 50+ Other pages
├── src/
|   ├── __server__/
|   |   ├── __db__
|   |   |   ├── all dummy data inside
|   ├── animations
|   ├── components/
|   |   ├── icons
|   |   ├── layouts
|   |   |   ├── customer-dashboard
|   |   |   ├── vendor-dashboard
|   |   |   └── And shop layouts
|   |   └── Includes reusable atomic components
|   ├── contexts
|   ├── data
|   ├── hooks
|   ├── models
|   ├── page-sections
|   |   └── Includes bigger components (these components contain hard coded data)
|   ├── theme
|   ├── utils
|   |   ├── __api__
|   |   |   ├── all api functions create inside
|   ├── lib
└── README.md
```

## Pages/Routing

Bazaar react follows [Next.js routing standard](https://nextjs.org/docs/routing/introduction).
All the routes/pages are inside `pages` folder.

## Compnents

Component structure are straight forward.

- Reusable atomic components are located in `src/components/`
- Bigger static components are located in `src/page-sections`
  - Static component means, these components has static data which you may want to modify

## Shop Layouts

All the shop layouts are inside `src/components/layouts`
Layout headers are located in `src/components/header`

## Shop Navigation

- Shop horizontal navbar navigation data is stored in `src/data/navbarNavigations.ts`
- Category dropdown navigation data is stored in `src/data/navigations.ts`

## Admin Dashboard

- Admin dashboard pages are inside `pages/admin`.
- Admin dashboard layout components are inside `src/components/layouts/vendor-dashboard`

### Admin Navigaiton

- Admin navigation data is stored in `src/components/layouts/vendor-dashboard/NavigationList.tsx`.

### Theme

- `theme/MuiTheme.tsx` is the main theme file.
- `theme/themeColors.ts` Contains theme colors (Primary, Secondary & etc.)
- `theme/components.js` Overrides the MUI default component styles
- `theme/typography.ts` Sets fontFamily and fontSize

#### Existing color themes

We have multiple color theme for different shops. E.G. Default, Grocery, Health & etc.
`themeOptions.ts` file returns one color theme based on currently displayed demo on browser(by detecting url path)

Of course you don't need this.
You can delete `themeOptions.ts` file and rename `themeOptionsSample.ts` to `themeOptions.ts`

Now `themeOptions.ts` file will always return one color theme.

### RTL

Open `src/contexts/SettingContext.tsx` and change the value of direction to 'rtl'
`const initialSettings: SettingsOptions = { direction: "rtl" };`

## REST API

- REST API calls are located in `src/__server__/__api__`

## Fake server

- REST APIs are getting data from dummy server located in `src/__server__/__db__`
- This server serves dummy data. You need to implement your own server.



### Roadmap

1. More funcional cart, cookie
2. List of all APIs/Functions

### Doc points

. app entry point
. page props
. component props
. SEO
. Cart
. navigation component structure and data structure

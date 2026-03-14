# Deployment-site

## Lynfera

test-server Directory

## 🔧 Folder Diagram

```
test-server
│   index.ts
│   package-lock.json
│   package.json
│   README.md
│
├───public
│   ├───tests
│   └───user-projects
│
└───src
    │   index.ts
    │
    ├───config
    │       env.config.ts
    │
    ├───controller
    │       controller.ts
    │
    ├───middleware
    │       authorizeActions.ts
    │       validate.ts
    │
    └───routes
            routes.ts
```

## 🔐 Environment Variables

Create a `.env` file in this directory: test-server

```env
KAFKA_USERNAME=
KAFKA_PASSWORD=
```

<br/>
<br/>

## ~~~~

```sh
cd Deployment-site/test-server
```

## Commands

```sh
npm run dev
```

```sh
npm run build
```

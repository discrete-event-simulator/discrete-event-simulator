# Discrete Event Simulator

## Install

Install ns.py submodule

```bash
git submodule update --init --recursive
```

Now you will have ns.py directory with requirements.txt

Install virtualenv with the python dependencies in ns.py

```bash
pip install virtualenv
virtualenv virtualenv
source virtualenv/bin/activate
pip install -r ns.py/requirements.txt
```

Install node packages

```bash
npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

This project is based on [Electron React Boilerplate](https://electron-react-boilerplate.js.org/docs/installation)

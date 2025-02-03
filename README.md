# Insight - Twitter Fact-Checker

Fact-Check tweets instantly with Insight! The projects makes use of advanced AI models, auto-scrapping of news sources, as well as LLMs to provide the most accurate fact-checking service.

## Introduction

Insight is a chrome extension that allows users to fact-check tweets in real-time. The extension has an easy-to-use interface. A fact-check button is rendered when a user interacts with a tweet, and results of the same are shown to the user via an extension.

The extension makes use of React (Vite), TypeScript, and Chakra UI for the frontend.

## Features

The salient features of the backend includes:

- Highly performant and scalable architecture
- Average inference time of milliseconds with incorporation of caching with Redis
- Use of continous scraping to keep maintain a vector dabatase of news sources
- Use of Open-Source AI models to provide the most accurate fact-checking service

## Demo

## Setup

You need to first clone the repository locally to get started with the setup.

```sh
git clone git@github.com:EshaanAgg/fact-check.git
```

### Frontend

We make use of `Yarn 1.X` as the package manager for the project. You can install either install it from the [official website](https://yarnpkg.com/getting-started/install), or let [Volta](https://volta.sh/) manage the version of `Yarn` for you. After that you need to just install the dependencies & build the extension.

```sh
cd insight
yarn
yarn build
```

After the successful build, you can load the extension in your browser:

1. Navigate to [chrome://extensions/](chrome://extensions/)
2. Turn on the `Developer mode` toggle switch in the top right of the window.
3. Click the `Load unpacked` button in top left of the window.
4. Load the `dist` directory in the project directory.

### Backend

The backend is built using `FastAPI` and `Python 3.10`. You also need to install:

- [Redis](https://redis.io/download) for caching. Please install it on your local machine using the instructions provided on the [official website](https://redis.io/download).
- [Ollama] for the AI models. We make use of `Mistral` for the natural language prompt generation. You can install it from the [official website](https://ollama.ai/).

Next, you can setup the backend by running the following commands:

```sh
# Copy the .env file
cp .sample.env .env

# Install the dependencies
pip install -r requirements.txt

# Run the backend server
python main.py
```

While debugging, you can start the server in `reload` mode to automatically restart the server on file changes:

```sh
uvicorn main:create_app --reload --host 0.0.0.0 --port 8000 --factory
```

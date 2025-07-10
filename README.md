## TikToken Tokenizer Playground

![TikToken Tokenizer Playground](/public/assets/file1.png)

### Overview

An online playground for `openai/tiktoken`, designed to calculate the correct number of tokens for a given prompt. This tool allows users to input text or chat-based prompts, select different models or encodings, and visualize the tokenized output in an interactive interface.

### Features

* **Token Calculation:** Accurately compute the number of tokens for a given input using `openai/tiktoken`.
* **Model Selection:** Choose from various OpenAI models and encodings, including popular and open-source options.
* **Interactive UI:** Input text or chat messages and view tokenized results with color-coded segments.
* **Whitespace Visualization:** Toggle visibility of whitespace characters in tokenized output.
* **Responsive Design:** Optimized for both desktop and mobile devices using Tailwind CSS and `shadcn/ui` components.

### Technologies Used

* **Next.js 15:** Framework for building the server-rendered React application.
* **shadcn/ui:** Reusable, customizable UI components for a consistent and modern interface.
* **openai/tiktoken:** Library for tokenizing text and calculating token counts for OpenAI models.
* **React Query (Tanstack Query):** For efficient data fetching and state management.
* **Tailwind CSS:** Utility-first CSS framework for styling, with custom theme variables.
* **Lucide React:** Icon library for clean and minimal icons.

### Acknowledgments

This project is heavily inspired by the [dqbd/tiktokenizer](https://github.com/dqbd/tiktokenizer) repository. While not a fork, it was recreated from scratch with enhancements such as updated package versions, an upgrade to **Next.js 15** using the **App Router**, and support for additional models.

This project heavily draws inspiration and code from the `tiktokenizer` repository by **dqbd**. Multiple files, including core components for the tokenizer interface, model selection logic, and token visualization, were reused or adapted from this repository. We express our sincere gratitude to dqbd for their open-source contribution, which significantly accelerated the development of this playground.

Additional acknowledgments:

* **shadcn/ui** for providing accessible and customizable UI components.
* **openai/tiktoken** for the tokenization library that powers this tool.

### Getting Started

#### Prerequisites

* Node.js (v20 or higher)
* npm

#### Installation (Local)

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the playground.

#### Installation (Docker)

```bash
# Build the Docker image
docker build -t tiktoken-playground .

# Run the container
docker run -p 3000:3000 tiktoken-playground
```

### Usage

1. **Select a Model/Encoder:** Use the dropdown to choose an OpenAI model or encoding (e.g., `gpt-4o`, `cl100k_base`).
2. **Input Text:** Enter text in the provided textarea or use the chat editor for chat-based models.
3. **View Tokens:** The tokenized output and token count will be displayed in the Token Viewer section.
4. **Toggle Whitespace:** Check the "Show whitespace" option to visualize whitespace characters in the tokenized output.

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.

### Contact

For questions or feedback, please open an issue on the GitHub repository.
# RosieOS

I'm working on a project to make it easier to use the terminal, and this is v0.1. 

## Usage

Make sure you have node 16+ installed. To do that, go in your terminal.
1. Install nvm: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
2. Install node: "nvm install 16"

Then you can do the next steps:

1. Clone the repo here: https://github.com/JhaAman/rosie-app
2. Use "npm i" in the terminal to install all dependencies
3. Go into src/api/api.ts, open that up in VSCode. 
4. For now you'll have to supply your own API. I recommend checking out my [AI repo](https://github.com/JhaAman/codex-cli) and attaching this terminal up with that. 
5. Run with "npm run start" in the terminal
6. Enjoy being an instant master at using the terminal :)


Some example commands to try out:
- replace foo with bar in all python files
- what do you think of the weather?
- how do I delete a branch?
- throw away all my recent changes
- find all python files with "openai" in them

## Problems

- For the following issues, go [here](https://www.electronforge.io/config/plugins/webpack)
  - Virtual routing with react routing (hint: don't use browser history APIs)
  - Issues with native modules
  - Issues with preloading and loadUrl entry points
  - Content Security Policy (put it in the webpack plugin)
  - Any webpack related issues

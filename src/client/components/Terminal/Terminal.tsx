import * as React from "react";

import { Terminal as Xterm } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
/*
import {LigaturesAddon} from 'xterm-addon-ligatures';
import {Unicode11Addon} from 'xterm-addon-unicode11';
*/
import { api } from "../../../api/api";

// Consider making a utils script for clipboard handling
import { clipboard, shell } from "electron";

import { ITermProps } from "../../rosie";
import { def_addons, def_options } from "./default";
import "./terminal.css";

export default class Terminal extends React.Component<
  ITermProps,
  { input: string } // TODO: Remove this once I have pty
> {
  // Variable Definitions
  terminal!: Xterm;
  ref: React.RefObject<HTMLDivElement>;
  fitAddon: FitAddon;
  searchAddon: SearchAddon;
  resizeTimeout: NodeJS.Timeout;

  constructor(props: ITermProps) {
    super(props);
    this.setupMounting();
    this.setupTerminalListeners();
    this.setupAddons();

    // TODO: Remove this once I have pty
    this.state = {
      input: "",
    };
  }

  /*
    Lifecycle
  */
  componentDidMount(): void {
    if (this.ref.current) {
      this.terminal.open(this.ref.current);
    }
    window.addEventListener("resize", this.onWindowResize);
    this.fit();
    this.prompt("Enter in what'd you'd like to do - in English.\r\n> ");
  }

  componentWillUnmount(): void {
    // Dispose terminal and all of its listeners
    this.terminal.dispose();
    window.removeEventListener("resize", this.onWindowResize);
  }

  /*
    Other functions
  */

  setupMounting = (): void => {
    this.ref = React.createRef<HTMLDivElement>();
    const options = this.props.options ? this.props.options : def_options;
    this.terminal = new Xterm(options);
  };

  // Pass all xterm listeners (like onData) to xterm
  setupTerminalListeners = (): void => {
    this.terminal.onData(this.onData);
  };

  // Add addon references and load all addons onto terminal
  setupAddons = (): void => {
    // Grab addons. If not in props, then from default.ts
    const addons = this.props.addons ? this.props.addons : def_addons;

    for (const [title, addon] of Object.entries(addons)) {
      // Execute custom logic. Skip loading by using `continue`
      switch (title) {
        case "fit":
          this.fitAddon = addon as FitAddon;
          break;
        case "search":
          continue;
      }

      // console.log(`Loaded a ${title}Addon to Xterm`);
      this.terminal.loadAddon(addon);
    }
  };

  onWindowResize = (): void => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.fitAddon.fit(), 250);
  };

  /*
    XTerm Listeners
  */

  private onBinary(data: string) {
    throw new Error("Unimplemented");
  }

  private onCursorMove() {
    throw new Error("Unimplemented");
  }
  private onData = async (data: string): Promise<void> => {
    // // TODO: Remove this once I have pty
    const code = data.charCodeAt(0);
    // User hit return
    if (code === 13 && this.state.input.length > 0) {
      this.newLine();
      this.prompt(">");
      // Get response from OpenAI Codex
      api(this.state.input).then((res) => {
        const response = res.data.choices[0].text;
        console.log(response);
        this.write(response);
        this.newLine();
        this.prompt();
        this.setState({ input: "" });
      });
    } else if (code < 32 || code === 127) {
      // Disable control keys such as arrow keys
      return;
    } else {
      // Add general key press characters to the terminal
      this.write(data);
      this.setState({ input: this.state.input + data });
    }
  };
  private onKey(event: { key: string; domEvent: KeyboardEvent }) {
    throw new Error("Unimplemented");
  }

  private onLineFeed() {
    throw new Error("Unimplemented");
  }

  private onScroll(newPosition: number) {
    throw new Error("Unimplemented");
  }

  private onSelectionChange() {
    throw new Error("Unimplemented");
  }

  private onRender(event: { start: number; end: number }) {
    throw new Error("Unimplemented");
  }

  private onResize(event: { cols: number; rows: number }) {
    throw new Error("Unimplemented");
  }

  private onTitleChange(newTitle: string) {
    throw new Error("Unimplemented");
  }

  /*
    Outward facing functions
  */

  pty_output = (data: string): void => {
    console.log(data);
    this.write(data);
  };

  prompt = (data?: string): void => {
    this.write(data ? data : "> ");
  };

  fit = (): void => {
    this.fitAddon.fit();
  };

  newLine = (): void => {
    this.write(`\r\n`);
  };

  write = (data: string): void => {
    this.terminal.write(data);
  };

  /*
    Render Dom
  */

  render(): JSX.Element {
    return (
      <div className="wrapper">
        <div className="term_fit" ref={this.ref} />
      </div>
    );
  }
}

import { ITerminalOptions } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";

export interface ITermProps {
  options?: ITerminalOptions;

  /*
    If you'd like custom addons, the parent object must
    pass addons as props. An example would be: 
    addons={{
          fit: new FitAddon(),
          search: new SearchAddon(),
        }}
    This is also what will be loaded if no addons are passed
  */
  addons?: {
    fit?: FitAddon;
    search?: SearchAddon;
  };
}

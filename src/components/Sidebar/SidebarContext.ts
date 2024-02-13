import {createContext} from "react";

interface ISidebarContext {
	expanded: boolean;
}

const defaultState: ISidebarContext = {
	expanded: false,
};

export const SidebarContext = createContext<ISidebarContext>(defaultState);
import {createContext, PropsWithChildren, useState} from "react";

type SidebarContextType = {
	expanded: boolean;
	mobileExpanded: boolean;

	toggleExpanded: () => void;
	toggleMobileExpanded: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarProvider = ({children}: PropsWithChildren) => {
	const [_expanded, _setExpanded] = useState<boolean>(false);
	const [_mobileExpanded, _setMobileExpanded] = useState<boolean>(false);

	const toggleExpanded = () => {
		_setExpanded(cur => !cur);
	};

	const toggleMobileExpanded = () => {
		_setMobileExpanded(cur => !cur);
	};

	return <SidebarContext.Provider value={{
		expanded: _expanded,
		mobileExpanded: _mobileExpanded,
		toggleExpanded,
		toggleMobileExpanded,
	}}>
		{children}
	</SidebarContext.Provider>;
};

export default SidebarProvider;
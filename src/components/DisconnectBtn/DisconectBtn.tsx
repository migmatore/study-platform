import * as React from "react";
import {useDisconnectButton} from "@livekit/components-react";
import {Button} from "../ui/Button/Button.tsx";

export interface DisconnectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	stopTracks?: boolean;
	onDisconnecting: () => void;
}

export const DisconnectButton = /* @__PURE__ */ React.forwardRef<
	HTMLButtonElement,
	DisconnectButtonProps
>(function DisconnectButton(props: DisconnectButtonProps, ref) {
	const {buttonProps} = useDisconnectButton(props);
	return (
		<Button ref={ref}
				variant="danger"
				className="gap-2 w-full"
				disabled={buttonProps.disabled}
				onClick={(e) => {
					buttonProps.onClick(e);
					props.onDisconnecting();
				}}>
			{props.children}
		</Button>
	);
});
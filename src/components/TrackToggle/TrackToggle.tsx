import {ToggleSource} from "@livekit/components-core";
import {useTrackToggle} from "@livekit/components-react";
import {Button} from "../ui/Button/Button.tsx";
import {Track} from "livekit-client";
import {Camera, CameraOff, Mic, MicOff} from "lucide-react";

interface Props<T extends ToggleSource> {
	source: T;
	initialState?: boolean;
	onChange?: (enabled: boolean, isUserInitiated: boolean) => void;
}

const getSourceIcon = (source: Track.Source, enabled: boolean) => {
	switch (source) {
		case Track.Source.Camera:
			return enabled ? <Camera size={20}/> : <CameraOff size={20}/>
		case Track.Source.Microphone:
			return enabled ? <Mic size={20}/> : <MicOff size={20}/>
		default:
			return undefined;
	}
}

const TrackToggle = <T extends ToggleSource>(props: Props<T>) => {
	const {buttonProps, enabled} = useTrackToggle(props);

	return (
		<Button size="icon" variant="primary_outline" {...buttonProps}>
			{getSourceIcon(props.source, enabled)}
		</Button>
	)
};

export default TrackToggle;
import {useState} from "react";
import {LocalAudioTrack, LocalVideoTrack} from "livekit-client";
import MediaDeviceSelect from "../MediaDeviceSelect/MediaDeviceSelect.tsx";

interface Props {
	kind?: MediaDeviceKind;
	disable: boolean;
	initialSelection?: string;
	onActiveDeviceChange?: (kind: MediaDeviceKind, deviceId: string) => void;
	tracks?: Partial<Record<MediaDeviceKind, LocalAudioTrack | LocalVideoTrack | undefined>>;
	requestPermissions?: boolean;
}

const MediaDeviceMenu = ({kind, disable = false, initialSelection, onActiveDeviceChange, tracks, requestPermissions = false}: Props) => {
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

	const handleActiveDeviceChange = (kind: MediaDeviceKind, deviceId: string) => {
		console.log("handle device change " + deviceId);
		onActiveDeviceChange?.(kind, deviceId);
	};

	return (
		<MediaDeviceSelect initialSelection={initialSelection}
						   onActiveDeviceChange={(deviceId) => {handleActiveDeviceChange(kind, deviceId); console.log("onActiveDeviceChange " + deviceId)}}
						   onDeviceListChange={setDevices}
						   kind={kind}
						   disable={disable}
						   track={tracks?.[kind]}
						   requestPermissions={requestPermissions} onError={e => console.error(e)} onDeviceSelectError={e => console.error(e)}/>
	);
};

export default MediaDeviceMenu;
import {useCallback, useEffect} from "react";
import {useMaybeRoomContext, useMediaDeviceSelect} from "@livekit/components-react";
import {LocalAudioTrack, LocalVideoTrack, RoomEvent} from "livekit-client";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/Select/Select.tsx";

interface Props {
	kind: MediaDeviceKind;
	disable: boolean;
	onActiveDeviceChange?: (deviceId: string) => void;
	onDeviceListChange?: (devices: MediaDeviceInfo[]) => void;
	onDeviceSelectError?: (e: Error) => void;
	initialSelection?: string;
	exactMatch?: boolean;
	track?: LocalAudioTrack | LocalVideoTrack;
	requestPermissions?: boolean;
	onError?: (e: Error) => void;
}

const MediaDeviceSelect = ({
	kind,
	disable = false,
	onActiveDeviceChange,
	onDeviceListChange,
	onDeviceSelectError,
	initialSelection,
	exactMatch,
	track,
	requestPermissions,
	onError,
}: Props) => {
	const room = useMaybeRoomContext();
	const handleError = useCallback(
		(e: Error) => {
			if (room) {
				// awkwardly emit the event from outside of the room, as we don't have other means to raise a MediaDeviceError
				room.emit(RoomEvent.MediaDevicesError, e);
			}
			onError?.(e);
		},
		[room, onError],
	);
	const {devices, activeDeviceId, setActiveMediaDevice} = useMediaDeviceSelect({
		kind,
		room,
		track,
		requestPermissions,
		onError: handleError,
	});
	useEffect(() => {
		if (initialSelection !== undefined) {
			setActiveMediaDevice(initialSelection);
		}
	}, [setActiveMediaDevice]);

	useEffect(() => {
		if (typeof onDeviceListChange === "function") {
			onDeviceListChange(devices);
		}
	}, [onDeviceListChange, devices]);

	useEffect(() => {
		if (activeDeviceId && activeDeviceId !== "") {
			onActiveDeviceChange?.(activeDeviceId);
		}
	}, [activeDeviceId]);

	const handleActiveDeviceChange = async (deviceId: string) => {
		try {
			await setActiveMediaDevice(deviceId, {exact: exactMatch});
		} catch (e) {
			if (e instanceof Error) {
				onDeviceSelectError?.(e);
			} else {
				throw e;
			}
		}
	};

	return (
		<Select disabled={disable} defaultValue={initialSelection} onValueChange={v => handleActiveDeviceChange(v)}>
			<SelectTrigger>
				<SelectValue/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{devices.map((device, index) =>
						<SelectItem key={index} value={device.deviceId}>{device.label}</SelectItem>)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default MediaDeviceSelect;
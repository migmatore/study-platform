import {Track} from "livekit-client";
import {useLocalParticipantPermissions, usePersistentUserChoices, useTracks} from "@livekit/components-react";
import TrackToggle from "../TrackToggle/TrackToggle.tsx";
import MediaDeviceMenu from "../MediaDeviceMenu/MediaDeviceMenu.tsx";
// import {StartMediaButton} from "@livekit/components-react/dist/components/controls/StartMediaButton";
import {defaultUserChoices} from "@livekit/components-core";
import {PhoneOff} from "lucide-react";
import {DisconnectButton} from "../DisconnectBtn/DisconectBtn.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";

export type ControlBarControls = {
	microphone?: boolean;
	camera?: boolean;
	chat?: boolean;
	screenShare?: boolean;
	leave?: boolean;
	settings?: boolean;
};

export interface ControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
	variation?: "minimal" | "verbose" | "textOnly";
	controls?: ControlBarControls;
	saveUserChoices?: boolean;
	onDisconnecting: () => void;
}

const ControlBar = ({
	controls,
	onDisconnecting,
}: ControlBarProps) => {
	const [_userChoices, setUserChoices] = useState(defaultUserChoices);


	const {
		userChoices: initialUserChoices,
		saveAudioInputDeviceId,
		saveAudioInputEnabled,
		saveVideoInputDeviceId,
		saveVideoInputEnabled,
	} = usePersistentUserChoices({
		defaults: {},
		preventSave: false,
		preventLoad: false,
	});

	const [audioEnabled, setAudioEnabled] = useState<boolean>(initialUserChoices.audioEnabled);
	const [videoEnabled, setVideoEnabled] = useState<boolean>(initialUserChoices.videoEnabled);
	const [audioDeviceId, _setAudioDeviceId] = useState<string>(
		initialUserChoices.audioDeviceId,
	);
	const [videoDeviceId, _setVideoDeviceId] = useState<string>(
		initialUserChoices.videoDeviceId,
	);

	// const [isChatOpen, setIsChatOpen] = useState(false);
	// const layoutContext = useMaybeLayoutContext();
	// useEffect(() => {
	// 	if (layoutContext?.widget.state?.showChat !== undefined) {
	// 		setIsChatOpen(layoutContext?.widget.state?.showChat);
	// 	}
	// }, [layoutContext?.widget.state?.showChat]);
	// const isTooLittleSpace = useMediaQuery(`(max-width: ${isChatOpen ? 1000 : 760}px)`);
	//
	// const defaultVariation = isTooLittleSpace ? "minimal" : "verbose";
	// variation ??= defaultVariation;

	const visibleControls = {leave: true, ...controls};

	const localPermissions = useLocalParticipantPermissions();

	if (!localPermissions) {
		visibleControls.camera = false;
		visibleControls.chat = false;
		visibleControls.microphone = false;
		visibleControls.screenShare = false;
	} else {
		visibleControls.camera ??= localPermissions.canPublish;
		visibleControls.microphone ??= localPermissions.canPublish;
		visibleControls.screenShare ??= localPermissions.canPublish;
		visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
	}

	// const browserSupportsScreenSharing = supportsScreenSharing();
	//
	// const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);
	//
	// const onScreenShareChange = useCallback(
	// 	(enabled: boolean) => {
	// 		setIsScreenShareEnabled(enabled);
	// 	},
	// 	[setIsScreenShareEnabled],
	// );

	const microphoneOnChange = useCallback(
		(enabled: boolean, isUserInitiated: boolean) => {
			if (isUserInitiated) {
				setAudioEnabled(enabled);
				saveAudioInputEnabled(enabled);
			}
		},
		//isUserInitiated ? saveAudioInputEnabled(enabled) : null,
		[saveAudioInputEnabled],
	);

	const cameraOnChange = useCallback(
		(enabled: boolean, isUserInitiated: boolean) => {
			if (isUserInitiated) {
				setVideoEnabled(enabled);
				saveAudioInputEnabled(enabled);
			}
		},
		//isUserInitiated ? saveVideoInputEnabled(enabled) : null,
		[saveVideoInputEnabled],
	);

	const tracks = useTracks(
		[
			{source: Track.Source.Camera, withPlaceholder: true},
			{source: Track.Source.ScreenShare, withPlaceholder: false},
		],
		{onlySubscribed: false},
	);


	const videoTrack = useMemo(
		() => tracks.filter((track) => track.publication?.kind === Track.Kind.Video)[0],
		[tracks],
	);

	const audioTrack = useMemo(
		() => tracks.filter((track) => track.publication?.kind === Track.Kind.Audio)[0],
		[tracks],
	);

	useEffect(() => {
		saveAudioInputEnabled(audioEnabled);
	}, [audioEnabled, saveAudioInputEnabled]);
	useEffect(() => {
		saveVideoInputEnabled(videoEnabled);
	}, [videoEnabled, saveVideoInputEnabled]);
	useEffect(() => {
		saveAudioInputDeviceId(audioDeviceId);
	}, [audioDeviceId, saveAudioInputDeviceId]);
	useEffect(() => {
		saveVideoInputDeviceId(videoDeviceId);
	}, [videoDeviceId, saveVideoInputDeviceId]);

	useEffect(() => {
		const newUserChoices = {
			username: "",
			videoEnabled,
			videoDeviceId,
			audioEnabled,
			audioDeviceId,
		};
		setUserChoices(newUserChoices);
	}, [videoEnabled, audioEnabled, audioDeviceId, videoDeviceId]);

	return (
		<div className="flex w-full flex-col gap-2">
			{visibleControls.microphone && (
				<div className="flex w-full gap-2">
					<div>
						<TrackToggle
							initialState={audioEnabled}
							source={Track.Source.Microphone}
							onChange={microphoneOnChange}
						>
						</TrackToggle>
					</div>
					<MediaDeviceMenu
						initialSelection={audioDeviceId}
						disable={!audioTrack || !audioEnabled}
						kind="audioinput"
						onActiveDeviceChange={(_kind, deviceId) => saveAudioInputDeviceId(deviceId ?? "")}
					/>
				</div>
			)}
			{visibleControls.camera && (
				<div className="flex w-full gap-2">
					<div>
						<TrackToggle initialState={videoEnabled}
									 source={Track.Source.Camera}
									 onChange={cameraOnChange}>
						</TrackToggle>
					</div>
					<MediaDeviceMenu
						initialSelection={videoDeviceId}
						disable={!videoTrack || !videoEnabled}
						kind="videoinput"
						onActiveDeviceChange={(_kind, deviceId) => saveVideoInputDeviceId(deviceId ?? "")}
					/>
				</div>
			)}
			{visibleControls.leave && (
				<DisconnectButton onDisconnecting={onDisconnecting}>
					<PhoneOff size={20}/>
					<p>Завершить</p>
				</DisconnectButton>
			)}
			{/*<StartMediaButton />*/}
		</div>
	);
};

export default ControlBar;
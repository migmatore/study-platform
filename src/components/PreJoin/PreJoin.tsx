import {defaultUserChoices} from "@livekit/components-core";
import {
	LocalUserChoices,
	usePersistentUserChoices,
	usePreviewTracks,
} from "@livekit/components-react";
import {useEffect, useMemo, useRef, useState} from "react";
import {facingModeFromLocalTrack, LocalAudioTrack, LocalVideoTrack, Track} from "livekit-client";
import MediaDeviceMenu from "../MediaDeviceMenu/MediaDeviceMenu.tsx";
import {Label} from "../ui/Label/Label.tsx";
import TrackToggle from "../TrackToggle/TrackToggle.tsx";


interface Props {
	defaults?: Partial<LocalUserChoices>;
	persistUserChoices?: boolean;
	onError?: (err: Error) => void;
}

const PreJoin = ({defaults = {}, persistUserChoices = true, onError}: Props) => {
	const [_userChoices, setUserChoices] = useState(defaultUserChoices);

	const partialDefaults: Partial<LocalUserChoices> = {
		...(defaults.audioDeviceId !== undefined && {audioDeviceId: defaults.audioDeviceId}),
		...(defaults.videoDeviceId !== undefined && {videoDeviceId: defaults.videoDeviceId}),
		...(defaults.audioEnabled !== undefined && {audioEnabled: defaults.audioEnabled}),
		...(defaults.videoEnabled !== undefined && {videoEnabled: defaults.videoEnabled}),
		...(defaults.username !== undefined && {username: defaults.username}),
	};

	const {
		userChoices: initialUserChoices,
		saveAudioInputDeviceId,
		saveAudioInputEnabled,
		saveVideoInputDeviceId,
		saveVideoInputEnabled,
	} = usePersistentUserChoices({
		defaults: partialDefaults,
		preventSave: !persistUserChoices,
		preventLoad: !persistUserChoices,
	});

	const [audioEnabled, setAudioEnabled] = useState<boolean>(initialUserChoices.audioEnabled);
	const [videoEnabled, setVideoEnabled] = useState<boolean>(initialUserChoices.videoEnabled);
	const [audioDeviceId, setAudioDeviceId] = useState<string>(
		initialUserChoices.audioDeviceId,
	);
	const [videoDeviceId, setVideoDeviceId] = useState<string>(
		initialUserChoices.videoDeviceId,
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

	const tracks = usePreviewTracks(
		{
			audio: audioEnabled ? {deviceId: initialUserChoices.audioDeviceId} : false,
			video: videoEnabled ? {deviceId: initialUserChoices.videoDeviceId} : false,
		},
		onError,
	);

	const videoEl = useRef(null);

	const videoTrack = useMemo(
		() => tracks?.filter((track) => track.kind === Track.Kind.Video)[0] as LocalVideoTrack,
		[tracks],
	);

	const facingMode = useMemo(() => {
		if (videoTrack) {
			const {facingMode} = facingModeFromLocalTrack(videoTrack);
			return facingMode;
		} else {
			return "undefined";
		}
	}, [videoTrack]);

	const audioTrack = useMemo(
		() => tracks?.filter((track) => track.kind === Track.Kind.Audio)[0] as LocalAudioTrack,
		[tracks],
	);

	useEffect(() => {
		if (videoEl.current && videoTrack) {
			videoTrack.unmute();
			videoTrack.attach(videoEl.current);
		}

		return () => {
			videoTrack?.detach();
		};
	}, [videoTrack]);

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
		<div className="w-full flex flex-col">
			<div className="w-full h-full flex items-center justify-center">
				{(videoTrack && videoEnabled) &&(
					<video className="mb-4 w-[150px] h-[150px] sm:w-full sm:h-full" ref={videoEl} width="1280" height="720" data-lk-facing-mode={facingMode}/>
				)}
			</div>
			<div className="w-full h-full flex gap-3">
				<div className="w-full flex flex-col space-y-4">
					<div className="space-y-3">
						<Label>
							Камера
						</Label>
						<div className="flex gap-3">
							<TrackToggle
								initialState={videoEnabled}
								source={Track.Source.Camera}
								onChange={(enabled) => setVideoEnabled(enabled)}/>
							<MediaDeviceMenu
								initialSelection={videoDeviceId}
								kind="videoinput"
								disable={!videoTrack || !videoEnabled}
								tracks={{videoinput: videoTrack}}
								onActiveDeviceChange={(_, id) => setVideoDeviceId(id)}
							/>
						</div>
					</div>
					<div className="space-y-3">
						<Label>
							Микрофон
						</Label>
						<div className="flex gap-3">
							<TrackToggle
								initialState={audioEnabled}
								source={Track.Source.Microphone}
								onChange={(enabled) => setAudioEnabled(enabled)}/>
							<MediaDeviceMenu
								initialSelection={audioDeviceId}
								kind="audioinput"
								disable={!audioTrack || !audioEnabled}
								tracks={{audioinput: audioTrack}}
								onActiveDeviceChange={(_, id) => setAudioDeviceId(id)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreJoin;
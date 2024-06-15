import * as React from 'react';
import type { Participant } from 'livekit-client';
import { Track } from 'livekit-client';
import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import { isTrackReference, isTrackReferencePinned } from '@livekit/components-core';
import {
	AudioTrack, ConnectionQualityIndicator, FocusToggle, LockLockedIcon,
	ParticipantContext, ParticipantName, TrackMutedIndicator,
	TrackRefContext,
	useEnsureTrackRef,
	useFeatureContext, useIsEncrypted,
	useMaybeLayoutContext,
	useMaybeParticipantContext,
	useMaybeTrackRefContext, useParticipantTile, VideoTrack,
} from "@livekit/components-react";
import {ScreenShareIcon} from "lucide-react";
import ParticipantPlaceholder from "./ParticipantPlaceholder.tsx";
import Kind = Track.Kind;

export function ParticipantContextIfNeeded(
	props: React.PropsWithChildren<{
		participant?: Participant;
	}>,
) {
	const hasContext = !!useMaybeParticipantContext();
	return props.participant && !hasContext ? (
		<ParticipantContext.Provider value={props.participant}>
			{props.children}
		</ParticipantContext.Provider>
	) : (
			   <>{props.children}</>
		   );
}

function TrackRefContextIfNeeded(
	props: React.PropsWithChildren<{
		trackRef?: TrackReferenceOrPlaceholder;
	}>,
) {
	const hasContext = !!useMaybeTrackRefContext();
	return props.trackRef && !hasContext ? (
		<TrackRefContext.Provider value={props.trackRef}>{props.children}</TrackRefContext.Provider>
	) : (
			   <>{props.children}</>
		   );
}

export interface ParticipantTileProps extends React.HTMLAttributes<HTMLDivElement> {
	trackRef?: TrackReferenceOrPlaceholder;
	disableSpeakingIndicator?: boolean;

	onParticipantClick?: (event: ParticipantClickEvent) => void;
}

export const ParticipantTile = /* @__PURE__ */ React.forwardRef<
	HTMLDivElement,
	ParticipantTileProps
>(function ParticipantTile(
	{
		trackRef,
		children,
		onParticipantClick,
		disableSpeakingIndicator,
		...htmlProps
	}: ParticipantTileProps,
	ref,
) {
	const trackReference = useEnsureTrackRef(trackRef);

	const { elementProps } = useParticipantTile<HTMLDivElement>({
		htmlProps,
		disableSpeakingIndicator,
		onParticipantClick,
		trackRef: trackReference,
	});
	const isEncrypted = useIsEncrypted(trackReference.participant);
	const layoutContext = useMaybeLayoutContext();

	const autoManageSubscription = useFeatureContext()?.autoSubscription;

	const handleSubscribe = React.useCallback(
		(subscribed: boolean) => {
			if (
				trackReference.source &&
				!subscribed &&
				layoutContext &&
				layoutContext.pin.dispatch &&
				isTrackReferencePinned(trackReference, layoutContext.pin.state)
			) {
				layoutContext.pin.dispatch({ msg: 'clear_pin' });
			}
		},
		[trackReference, layoutContext],
	);

	//const {userChoices} = usePersistentUserChoices();

	return (
		<div ref={ref} {...elementProps} className="p-p relative flex flex-col overflow-hidden h-full">
			<TrackRefContextIfNeeded trackRef={trackReference}>
				<ParticipantContextIfNeeded participant={trackReference.participant}>
					{children ?? (
						<>
							{isTrackReference(trackReference) &&
							 (trackReference.publication?.kind === Kind.Video ||
								 trackReference.source === Track.Source.Camera) ? (
								 <VideoTrack
									 trackRef={trackReference}
									 onSubscriptionStatusChanged={handleSubscribe}
									 manageSubscription={autoManageSubscription}
									 className="w-[150px] h-[150px] sm:max-w-fit sm:max-h-[200px]"
								 />
							 ) : (
								 isTrackReference(trackReference) && (
									 <AudioTrack
										 trackRef={trackReference}
										 onSubscriptionStatusChanged={handleSubscribe}
									 />
								 )
							 )}
							<div className="absolute inset-0 flex items-center justify-center bg-gray-300 opacity-0 pointer-events-none rounded-md [.p-p[data-lk-video-muted='true'][data-lk-data-source='camera']_&]:opacity-100">
								<ParticipantPlaceholder className="w-auto h-full p-[30%]"/>
							</div>
							<div className="absolute right-1 bottom-1 left-1 flex items-center justify-between gap-2">
								<div className="flex items-center p-1 border-black opacity-50 text-foreground">
									{trackReference.source === Track.Source.Camera ? (
										<>
											{isEncrypted && <LockLockedIcon style={{ marginRight: '0.25rem' }} />}
											<TrackMutedIndicator
												trackRef={{
													participant: trackReference.participant,
													source: Track.Source.Microphone,
												}}
												show={'muted'}
											></TrackMutedIndicator>
											<ParticipantName />
										</>
									) : (
										 <>
											 <ScreenShareIcon style={{ marginRight: '0.25rem' }} />
											 <ParticipantName>&apos;s screen</ParticipantName>
										 </>
									 )}
								</div>
								<ConnectionQualityIndicator style={{ fill: "red" }} />
							</div>
						</>
					)}
					<FocusToggle trackRef={trackReference} />
				</ParticipantContextIfNeeded>
			</TrackRefContextIfNeeded>
		</div>
	);
});
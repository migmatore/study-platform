export enum MessageType {
	Auth = 1,
	VirtualPointer,
	Call,
	Error,
}

export type AuthMsg = {
	type: MessageType.Auth;
	token: string;
}

export type VirtualPointerMsg = {
	type: MessageType.VirtualPointer;
	classroomId: number;
	elementId: string;
}

export type CallMsg = {
	type: MessageType.Call;
	classroomId: number;
}

export enum ErrorType {
	ExpiredToken
}

export type ErrorMsg = {
	type: MessageType.Error;
	ErrorType: ErrorType;
}

export type RealtimeMsg = AuthMsg | VirtualPointerMsg | CallMsg | ErrorMsg;
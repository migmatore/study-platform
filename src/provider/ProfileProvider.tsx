import {createContext, PropsWithChildren, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {IProfileResp} from "../types/profile.ts";
import {AxiosError} from "axios";
import profileService from "../services/profile.service.ts";

type ProfileContextType = {
	profile: IProfileResp;
	updateProfile: (profile: SetStateAction<IProfileResp>) => void;
	fetchError: string | null;
	isLoading: boolean;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

const defaultState = {
	fullName: "",
	phone: "",
	email: "",
};

export const ProfileProvider = ({children}: PropsWithChildren) => {
	const [profile, setProfile] = useState<IProfileResp>(defaultState);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dataFetchRef = useRef<boolean>(false);

	useEffect(() => {
		if (dataFetchRef.current) return;
		dataFetchRef.current = true;

		const getProfile = async () => {
			try {
				const resp = await profileService.getProfile();

				if (resp.status === 200) {
					setIsLoading(false);
					setProfile(resp.data);
				}
			} catch (e) {
				const error = e as AxiosError;
				setIsLoading(false);
				setFetchError("Ошибка получения профиля");
				console.log(error);
			}
		};

		getProfile().catch(console.error);
	}, []);

	const updateProfile = (profile: SetStateAction<IProfileResp>) => {
		setProfile(profile);
	};

	const contextValue: ProfileContextType | null = useMemo(() => ({
		profile,
		updateProfile,
		fetchError,
		isLoading,
	}), [profile, fetchError, fetchError]);

	return <ProfileContext.Provider value={contextValue}>
		{children}
	</ProfileContext.Provider>;
};

export default ProfileProvider;
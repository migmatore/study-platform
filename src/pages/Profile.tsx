import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../components/ui/Form/Form.tsx";
import {Input} from "../components/ui/Input/Input.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../components/ui/Button/Button.tsx";
import {ImSpinner2} from "react-icons/im";
import {useState} from "react";
import useProfile from "../hooks/useProfile.tsx";
import {Menu} from "lucide-react";
import useSidebar from "../hooks/useSidebar.tsx";
import {IProfileResp} from "../types/profile.ts";
import profileService from "../services/profile.service.ts";
import {AxiosError} from "axios";

const phoneRegexp = new RegExp(/^((8|\+7)[\-_]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

const profileSchema = z.object({
	fullName: z.string().min(1).max(100).or(z.literal("")),
	phone: z.string().regex(phoneRegexp).or(z.literal("")),
	email: z.string().email().max(50).or(z.literal("")),
	password: z.string().min(8).max(100).or(z.literal("")),
});

type profileSchemaType = z.infer<typeof profileSchema>;

const Profile = () => {
	const {profile} = useProfile();
	const {toggleMobileExpanded} = useSidebar();
	const [error, setError] = useState<string | null>(null);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const form = useForm<profileSchemaType>({
		resolver: zodResolver(profileSchema),
		mode: "onSubmit",
		values: {
			fullName: profile.fullName,
			phone: profile.phone,
			email: profile.email,
			password: "",
		},
	});

	const isProfileChanged = (profile: profileSchemaType): boolean => {
		// return newProfile.fullName !== oldProfile.fullName || newProfile.phone !== oldProfile.phone
		// 	|| newProfile.email !== oldProfile.email || newProfile.password !== "";

		let property: keyof typeof profile;

		for (property in profile) {
			if (form.getFieldState(property).isDirty) {
				return true;
			}
		}

		return false;
	};

	const handleSave = (values: profileSchemaType) => {
		console.log(values);

		const updateProfile = async () => {
			try {
				var newProfileFields: {[k: string]: any} = {};


				let property: keyof typeof values;

				for (property in values) {
					if (form.getFieldState(property).isDirty) {
						newProfileFields[property] = values[property];
					}
				}

				const resp = await profileService.updateProfile(newProfileFields);
				if (resp.status === 200) {
					console.log("ok")
				}
			} catch (e) {
				const error = e as AxiosError;
				console.log(error);
			}
		}

		updateProfile().catch(console.error);
	};

	return (
		<div className="w-full h-full p-4">
			<div className="flex mb-4 gap-4">
				<Button className="sm:hidden" variant="outline" size="icon" onClick={toggleMobileExpanded}>
					<Menu size={20}/>
				</Button>
				<h1 className="text-2xl text-foreground">Профиль</h1>
			</div>
			<div className="flex flex-col space-y-4 sm:w-[400px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSave)}
						  className="space-y-4"
						  onChange={() => setIsChanged(isProfileChanged(form.getValues()))}>
						<FormField control={form.control}
								   name="fullName"
								   defaultValue="test"
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>ФИО</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="phone"
								   defaultValue={profile.phone}
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Номер телефона</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="email"
								   defaultValue={profile.email}
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Адрес электронной почты</FormLabel>
										   <FormControl>
											   <Input type="email" {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="password"
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Новый пароль</FormLabel>
										   <FormControl>
											   <Input type="password" {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				{error &&
                    <div className="flex flex-col bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                        <h3 className="text-lg">Ошибка обновления данных профиля</h3>
                        <p>{error}</p>
                    </div>
				}
				<div className="space-y-3">
					<Button onClick={form.handleSubmit(handleSave)} className="w-full" disabled={!isChanged}>
						{!form.formState.isSubmitting && <span>Сохранить</span>}
						{form.formState.isSubmitting && (
							<ImSpinner2 className="animate-spin"/>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
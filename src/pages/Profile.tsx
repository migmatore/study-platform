import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../components/ui/Form/Form.tsx";
import {Input} from "../components/ui/Input/Input.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../components/ui/Button/Button.tsx";
import {ImSpinner2} from "react-icons/im";
import {useState} from "react";
import useProfile from "../hooks/useProfile.tsx";

const phoneRegexp = new RegExp(/^((8|\+7)[\-_]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

const profileSchema = z.object({
	fullName: z.string().min(1).max(100).or(z.literal('')),
	phone: z.string().regex(phoneRegexp).or(z.literal('')),
	email: z.string().email().max(50).or(z.literal('')),
	password: z.string().min(8).max(100).or(z.literal('')),
});

type profileSchemaType = z.infer<typeof profileSchema>;

const Profile = () => {
	const {profile} = useProfile();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<profileSchemaType>({
		resolver: zodResolver(profileSchema),
		mode: "onSubmit",
		values: {
			fullName: profile.fullName,
			phone: profile.phone,
			email: profile.email,
			password: '',
		}
	});

	const handleSave = (values: profileSchemaType) => {
		console.log(values);
	}

	return (
		<div className="w-full h-full m-4">
			<div className="flex flex-col mb-4 gap-2">
				<h1 className="text-2xl text-foreground">Профиль</h1>
			</div>
			<div className="flex flex-col space-y-4 w-[400px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
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
										   <FormLabel>Пароль</FormLabel>
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
					<Button onClick={form.handleSubmit(handleSave)} className="w-full">
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
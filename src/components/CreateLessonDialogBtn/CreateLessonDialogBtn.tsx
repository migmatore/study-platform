import {z} from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/Dialog/Dialog.tsx";
import {Button} from "../ui/Button/Button.tsx";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/Form/Form.tsx";
import {Input} from "../ui/Input/Input.tsx";
import {ImSpinner2} from "react-icons/im";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "../ui/Switch/Switch.tsx";
import LessonService from "../../services/lesson.service.ts";
import {useEffect, useState} from "react";
import useLessons from "../../hooks/useLessons.tsx";

const lessonSchema = z.object({
	title: z.string({required_error: "Это поле является обязательным"}).min(1).max(100),
	active: z.boolean(),
});

type lessonSchemaType = z.infer<typeof lessonSchema>;

interface Props {
	classroomId: string;
}

const CreateLessonDialogBtn = ({classroomId}: Props) => {
	const {setLessons} = useLessons();
	const [open, setOpen] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const form = useForm<lessonSchemaType>({
		resolver: zodResolver(lessonSchema),
		mode: "onSubmit",
		defaultValues: {
			active: false,
		},
	});

	useEffect(() => {
		setIsError(false);
	}, [open]);

	const createLesson = async (values: lessonSchemaType) => {
		if (!classroomId) return;

		try {
			const resp = await LessonService.createLesson(classroomId, {...values});

			if (resp.status !== 201) {
				setIsError(true);

				return;
			}

			setOpen(false);

			if (!values.active) {
				setLessons(prev => [
					...prev, {
						id: resp.data.id,
						title: resp.data.title,
						classroomId: resp.data.classroomId,
						content: resp.data.content,
						active: resp.data.active,
					},
				]);

				return;
			}

			setLessons(prev => {
				const inactiveLessons = prev.map(lesson => ({
					...lesson, active: false,
				}));

				inactiveLessons.push({
					id: resp.data.id,
					title: resp.data.title,
					classroomId: resp.data.classroomId,
					content: resp.data.content,
					active: resp.data.active,
				});

				return inactiveLessons;
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="py-5 h-full gap-2 border-2 border-dashed">
					<Plus className="w-8 h-8"/>
					<span className="text-lg">Создать урок</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Создать урок
					</DialogTitle>
					<DialogDescription>
						Создайте новый урок
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(createLesson)} className="space-y-3">
						<FormField control={form.control}
								   name="title"
								   defaultValue=""
								   render={({field}) => (
									   <FormItem>
										   <FormLabel>Название урока</FormLabel>
										   <FormControl>
											   <Input {...field}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
						<FormField control={form.control}
								   name="active"
								   render={({field}) => (
									   <FormItem className="flex items-center justify-between rounded-lg border p-3 space-y-0">
										   <div className="space-y-0.5">
											   <FormLabel>Активный урок</FormLabel>
										   </div>
										   <FormControl>
											   <Switch checked={field.value} onCheckedChange={field.onChange}/>
										   </FormControl>
										   <FormMessage/>
									   </FormItem>
								   )}
						/>
					</form>
				</Form>
				{isError &&
                    <div className="flex bg-red-100 border border-destructive rounded-lg text-destructive p-5 justify-center items-center">
                        <p>Ошибка создания урока</p>
                    </div>
				}
				<DialogFooter>
					<Button onClick={form.handleSubmit(createLesson)}
							className="w-full mt-4">
						{!form.formState.isSubmitting && <span>Создать</span>}
						{form.formState.isSubmitting && (
							<ImSpinner2 className="animate-spin"/>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateLessonDialogBtn;
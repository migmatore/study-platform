export enum Roles {
	Admin = "admin",
	Teacher = "teacher",
	Student = "student",
}

export const enumFromValue = <T extends Record<string, string>>(val: string, _enum: T) => {
	const enumName = (Object.keys(_enum) as Array<keyof T>).find(k => _enum[k] === val);
	if (!enumName) throw Error(); // here fail fast as an example
	return _enum[enumName];
};
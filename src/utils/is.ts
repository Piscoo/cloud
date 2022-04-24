export function isEmail(val: string): boolean {
	return /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)+$/.test(val.trim());
}
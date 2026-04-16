export type FormFieldProps = {
	label: string;
	name: string;
	value: string;
	error?: string | undefined;
	onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	type?: 'text' | 'email' | 'textarea';
	placeholder?: string;
	autoComplete?: string;
	rows?: number;
	className?: string;
};

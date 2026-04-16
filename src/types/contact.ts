export type ContactFormData = {
	name: string;
	email: string;
	title: string;
	message: string;
	website: string;
	turnstileToken: string;
};

export type ContactFormErrors = {
	name?: string;
	email?: string;
	title?: string;
	message?: string;
};

export type ContactSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export type ContactFormProps = {
	form: ContactFormData;
	errors: ContactFormErrors;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onTurnstileToken: (token: string) => void;
};

export type ContactFormData = {
	name: string;
	email: string;
	title: string;
	message: string;
};

export type ContactFormErrors = {
	name?: string;
	email?: string;
	title?: string;
	message?: string;
};

export type ContactSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

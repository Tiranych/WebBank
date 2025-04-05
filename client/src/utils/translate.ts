import enLng from './locales/en.json';

const translation: Record<string, string> = enLng;

export const translateWord = (word: string): string => {
	return translation[word];
};

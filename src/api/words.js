import { apiYandex } from './secrets.js';

function formatYandexDictionaryResponse(word) {
	let eng = word['def'][0]['text'];
	let rus = word['def'][0]['tr'][0]['text'];
	let translations = {};
	let words = [];

	word['def'].forEach(def => {
		def['tr'].forEach(translation => {
			let partOfSpeech = translation['pos'];
			words.push(translation['text']);
			translations[partOfSpeech] = words;
		});
		words = [];
	});

	return { eng, rus, translations };
}

export default class ApiWords {

	static fetchWord(word) {
		return new Promise(resolve => {
			const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';
			const request = `${url}?key=${apiYandex}&lang=en-ru&text=${word}`;
			const response = fetch(request);

			resolve(response);
		}).then(word => {
			if (word.status !== 200) {
				return word.json().then(error => {
					throw new Error(error.message);
				});
			}
			return word.json();
		}).then(word => {
			if (word.def.length !== 0) return formatYandexDictionaryResponse(word);
			throw new Error('Response is empty');
		}).catch(error => {
			return Promise.reject(error);
		});
	}
}
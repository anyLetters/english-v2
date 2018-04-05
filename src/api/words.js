import { apiYandex } from './secrets.js';

function _formatYandexDictionaryResponse(data) {
	let eng = data['def'][0]['text'];
	let rus = data['def'][0]['tr'][0]['text'];
	let translations = {};
	let words = [];

	data['def'].forEach(function(x) {
		x['tr'].forEach(function(i){
			let wordPart = i['pos'];
			words.push(i['text']);
			translations[wordPart] = words;
		});
		words = [];
	});

	return fetch('/api/data')
		.then(response => response.data)
		.then(() => {
			return {
				eng,
				rus,
				translations
			};
		});
}

export default class ApiWords {

	static fetchWord(word) {
		return new Promise((resolve, reject) => {
			const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';
			const request = `${url}?key=${apiYandex}&lang=en-ru&text=${word}`;
			const response = fetch(request);

			resolve(response);

		}).then(word => {
			if (word.status !== 200) {
				return word.json().then(error => {
					console.error(error.message);
					throw new Error(error.message);
				});
			} else {
				return word.json();
			}
		}).then(word => {
			if (word.def.length !== 0) {
				return _formatYandexDictionaryResponse(word);
			} else {
				console.error('Response is empty');
				throw new Error('Response is empty');
			}
		}).catch(err => {
			return Promise.reject(err);
		});
	}
}
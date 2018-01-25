import { apiYandex } from './secrets.js';
import axios from 'axios';

function _formatYandexDictionaryResponse(data) {
	let eng = data['def'][0]['text'];
	let rus = data['def'][0]['tr'][0]['text'];
	let translations = {};
	let words = [];

	data['def'].forEach(function(x) {
		x['tr'].forEach(function (i){
			let wordPart = i['pos'];
			words.push(i['text']);
			translations[wordPart] = words;
		})
		words = [];
	})

	return axios.get('/api/data')
		.then(response => response.data)
		.then(data => {
			return {
				eng,
				rus,
				translations
			}
		})
}

// function _formatOxfordSentencesResponse(data) {
// 	let senses = {};

// 	data.results[0].lexicalEntries.forEach(entry => {
// 		senses[entry.lexicalCategory.toLowerCase()] = entry.entries[0].senses[0];
// 	})
// 	console.log(senses);
// }

// _formatOxfordSentencesResponse(sentences);

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
				})
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

	// static fetchEntry(word) {
	// 	return new Promise((resolve, reject) => {
	// 		const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	// 		const url = 'https://od-api.oxforddictionaries.com/api/v1';
	// 		const request = `${url}/entries/en/${word.replace(/ /g, '_')}`;
	// 		const response = fetch(proxyUrl + request, {method: 'GET', headers: {
	// 			"Accept": "application/json",
	// 			"app_id": apiOxford.id,
	// 			"app_key": apiOxford.key
	// 		}});

	// 		resolve(response);

	// 	}).then(entry => {
	// 		console.log(entry)
	// 		if (entry.status !== 200) {
	// 			return entry.json().then(error => {
	// 				console.error(error.message);
	// 				throw new Error(error.message);
	// 			})
	// 		} else {
	// 			return entry.json();
	// 		}
	// 	}).then(entry => {
	// 		if (defs.found) {
	// 			return examples;
	// 		} else {
	// 			console.error('Response is empty');
	// 			throw new Error('Response is empty');
	// 		}
	// 	}).catch(err => {
	// 		return Promise.reject(err);
	// 	});
	// }
}
import apiKey from './secrets.js';

export default class ApiWords {

	static fetchWord(word) {
		return new Promise((resolve, reject) => {
			const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup';
			const request = `${url}?key=${apiKey}&lang=en-ru&text=${word}`;
			const response = fetch(request);

			resolve(response);

		}).then((word) => {
			if (word.status === 200) {
				return word.json();
			} else {
				throw new Error('Yandex dictionary response has been failed by status');
			}
		}).then((word) => {
			if (word.def.length !== 0) {
				return this.formatJSON(word);
			} else {
				console.error('Yandex dictionary API response is empty');
				return null;
			}
		}).catch((err) => {
			return err;
		});
	}

	static formatJSON(data) {
		let eng = data['def'][0]['text'];
		let rus = data['def'][0]['tr'][0]['text'];
		let meanings = {};
		let hard = false;
		let created_at = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
		let words = [];

		data['def'].forEach(function(x) {
			x['tr'].forEach(function (i){
				let wordPart = i['pos'];
				words.push(i['text']);
				meanings[wordPart] = words;
			})
			words = [];
		})

		return {
			eng,
			rus,
			meanings,
			hard,
			created_at
		}
	}
	
	// add/edit a user
	static addEdit() {
		return new Promise(resolve => {
			setTimeout(() => {
				  // do something here
				resolve();
			}, 1000);
		});
	}
  
	// delete a user
	static delete() {
		return new Promise(resolve => {
			setTimeout(() => {
				  // do something here
				resolve();
			}, 500);
		});
	}
}
  
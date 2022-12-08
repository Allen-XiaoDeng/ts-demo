// const names: Array<string> = [];

// const promise: Promise<number> = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(10);
// 	}, 1000);
// });

// promise.then(data => {
// 	data.split('');
// });

// function merge<T, U>(objC: T, objB: U): T & U {
// 	return Object.assign(objC, objB);
// }

// const mergeObj = merge({ name: 'allen' }, { age: 30 });

const merge = <T extends object, U extends object>(obj111: T, objB: U): T & U => Object.assign(obj111, objB);

const mergeObj = merge({ name: 'allen', hobbies: ['Sports'] }, { age: 30 });
// mergeObj 的类型为 { name: string, age: number }
console.log(mergeObj);

interface Lengthy {
	length: number;
}

const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
	let descriptionText = 'Got no value.';
	if (element.length === 1) {
		descriptionText = 'Got 1 element.';
	} else if (element.length > 1) {
		descriptionText = 'Got' + element.length + 'elements.';
	}
	return [element, descriptionText];
};

console.log(countAndDescribe('hello world'));

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
	return 'value: ' + obj[key];
};

extractAndConvert({ name: 'max' }, 'name');

// class DataStorage<T> {
class DataStorage<T extends number | string> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), -1);
	}

	getItems() {
		return [...this.data];
	}
}

// const textStorage = new DataStorage<string>();
// textStorage.addItem('max');
// textStorage.addItem(12);

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'max' });
// objStorage.addItem('max');

interface CourseGoal {
	title: string;
	description: string;
	date: Date;
}

const createCourseGoal = (title: string, description: string, date: Date): CourseGoal => {
	let courseGoal: Partial<CourseGoal> = {};
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.date = date;
	return courseGoal as CourseGoal;
};

const names: Readonly<string[]> = ['Max', 'Amy'];
// names.push('Manu');

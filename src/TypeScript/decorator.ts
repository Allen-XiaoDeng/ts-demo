// const Logger = (constructor: Function) => {
// 	console.log('logging...');
// 	console.log(constructor);
// };

const Logger = (logString: string) => {
	return (constructor: Function) => {
		console.log(logString);
		console.log(constructor);
	};
};

// const WithTemplate = (template: string, hookId: string) => {
// 	return (_: any) => {
// 		const hookEl = document.getElementById(hookId);
// 		if (hookEl) {
// 			hookEl.innerHTML = template;
// 		}
// 	};
// };

const WithTemplate = (template: string, hookId: string) => {
	return <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) => {
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				console.log('Rendering template');
				const hookEl = document.getElementById(hookId);
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector('h1')!.textContent = this.name;
				}
			}
		};
	};
};

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
	name = 'Max';
	constructor() {
		console.log('creater person object');
	}
}

const pers = new Person();

console.log(pers);

// ----

const Log = (target: any, propertyName: string | Symbol) => {
	console.log('Property decorator');
	console.log(target, propertyName);
};

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
	console.log('Accessor decorator');
	console.log(target);
	console.log(name);
	console.log(descriptor);
};

const Log3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
	console.log('Method decorator');
	console.log(target);
	console.log(name);
	console.log(descriptor);
};

const Log4 = (target: any, name: string | Symbol, position: number) => {
	console.log('Parameter decorator');
	console.log(target);
	console.log(name);
	console.log(position);
};

class Product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(value: number) {
		if (value > 0) {
			this._price = value;
		} else {
			throw new Error('Invalid price - should be positive!');
		}
	}

	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number, price: number) {
		return this.price * (1 + tax);
	}
}

const p1 = new Product('Book', 19);

const Autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
};

class Printer {
	message = 'This works';

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();

const button1 = document.querySelector('button')!;
button1?.addEventListener('click', p.showMessage);

// ---

interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[]; // ['required', 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, propName: string) => {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ['required'],
	};
};

const PositiveNumber = (target: any, propName: string) => {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ['positive'],
	};
};

const validate1 = (obj: any) => {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig) {
		return true;
	}
	let isValid = true;
	for (const prop in objValidatorConfig) {
		console.log(prop);

		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case 'required':
					isValid = isValid && !!obj[prop];
					break;
				case 'positive':
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
};

class Course {
	@Required
	title: string;

	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
	event.preventDefault();
	const titleEl = document.getElementById('title') as HTMLInputElement;
	const priceEl = document.getElementById('price') as HTMLInputElement;

	const title = titleEl.value;
	const price = +priceEl.value;

	const createdCourse = new Course(title, price);

	if (!validate1(createdCourse)) {
		alert('Invalid input, please try again!');
		return;
	}
	console.log(createdCourse);
});

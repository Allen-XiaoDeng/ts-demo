type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: 'Max',
	privileges: ['create-server'],
	startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

type numbd1 = Combinable | Numeric;

function add3(a: number, b: number): number;
function add3(a: string, b: string): string;
function add3(a: string, b: number): string;
function add3(a: number, b: string): string;
function add3(a: Combinable, b: Combinable) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}

const result = add3('Max', 'Schwarz');
result.split('');

const fetchedUserData = {
	id: 'u1',
	name: 'Max',
	job: { title: 'CEO', description: 'My own company' },
};

// console.log(fetchedUserData.job && fetchedUserData.job.title);
console.log(fetchedUserData?.job?.title);

const userInput = null;

const storedData = userInput ?? 'DEFAULT';

type UnknownEmployee = Employee | Admin;

const printEmployeeInformation = (emp: UnknownEmployee) => {
	console.log('Name: ' + emp.name);
	if ('privileges' in emp) {
		console.log('Privileges: ' + emp.privileges);
	}
	if ('startDate' in emp) {
		console.log('Start Date' + emp.startDate);
	}
};

printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
	drive() {
		console.log('Driving...');
	}
}

class Truck {
	drive() {
		console.log('Driving...');
	}
	loadCargo(amount: number) {
		console.log('loadng cargo...' + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
};

useVehicle(v1);
useVehicle(v2);

interface Bird {
	type: 'bird';
	flyingSpeed: number;
}

interface Horse {
	type: 'horse';
	runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
	let speed;

	switch (animal.type) {
		case 'bird':
			speed = animal.flyingSpeed;
			break;
		case 'horse':
			speed = animal.runningSpeed;
			break;
	}
	console.log('Moving at speed: ' + speed);
};

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

const userInputElement = document.getElementById('user-input');

// userInputElement.value = 'Hi there!';

if (userInputElement) {
	(userInputElement as HTMLInputElement).value = 'Hi there!';
}

interface ErrorContainer {
	// { email: 'Not a valid email', username: 'Must start with a character!' }

	[prop: string]: string;
}

const errorBag: ErrorContainer = {
	email: 'Not a valid email',
	username: 'Must start with a capital character!',
};

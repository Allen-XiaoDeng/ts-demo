console.log('Hello World111');

const button = document.querySelector('button');

const add2 = (n1: number, n2: number) => {
	return n1 + n2;
};

const clickHandler = (message: string) => {
	// let userName = 'Max'
	// console.log('Clicked!111')
	// console.log(message)
	// console.log(userName)
	console.log('clicked' + message);
};

button?.addEventListener('click', clickHandler.bind(null, 'You are welcome!'));

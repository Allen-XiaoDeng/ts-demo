interface AddFn {
	(a: number, b: number): number;
}

interface Named {
	readonly name?: string;
	outputName?: string;
}

let add: AddFn;

add = (n1: number, n2: number) => {
	return n1 + n2;
};

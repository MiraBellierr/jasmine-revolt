declare module "ascii-table" {
	class AsciiTable {
		constructor(name?: string | object, options?: object);

		static LEFT: number;
		static CENTER: number;
		static RIGHT: number;

		static factory(name?: string | object, options?: object): AsciiTable;
		static align(dir: number, str: string, len: number, pad?: string): string;
		static alignLeft(str: string, len: number, pad?: string): string;
		static alignCenter(str: string, len: number, pad?: string): string;
		static alignRight(str: string, len: number, pad?: string): string;
		static alignAuto(str: any, len: number, pad?: string): string;
		static arrayFill(len: number, fill: any): any[];

		reset(name?: string | object): AsciiTable;
		clear(name?: string | object): AsciiTable;
		setBorder(
			edge?: string,
			fill?: string,
			top?: string,
			bottom?: string
		): AsciiTable;
		removeBorder(): AsciiTable;
		setAlign(idx: number, dir: number): AsciiTable;
		setTitle(name: string): AsciiTable;
		getTitle(): string;
		setTitleAlign(dir: number): AsciiTable;
		sort(method: Function): AsciiTable;
		sortColumn(idx: number, method: Function): AsciiTable;
		setHeading(row: string[] | any[]): AsciiTable;
		getHeading(): any[];
		setHeadingAlign(dir: number): AsciiTable;
		addRow(row: any[] | any): AsciiTable;
		getRows(): any[][];
		addRowMatrix(rows: any[][]): AsciiTable;
		addData(data: any[], rowCallback: Function, asMatrix?: boolean): AsciiTable;
		clearRows(): AsciiTable;
		setJustify(val?: boolean): AsciiTable;
		toJSON(): object;
		parse(obj: object): AsciiTable;
		fromJSON(obj: object): AsciiTable;
		render(): string;
		valueOf(): string;
		toString(): string;

		private _seperator(len: number, sep?: string): string;
		private _renderTitle(len: number): string;
		private _renderRow(row: any[], padding: string, align?: number): string;
		private _rowSeperator(len: number, sep: string): string;
	}

	export = AsciiTable;
}

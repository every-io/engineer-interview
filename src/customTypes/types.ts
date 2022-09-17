export type TStatus = "todo" | "in_progress" | "done";

export interface ICard {
	id: string;
	title: string;
	status: TStatus;
}

export interface IList {
	id: string;
	title: string;
	cards: ICard[];
}

export type TMove = "next" | "prev";

export type TMovement = {
	[K in TStatus]: {
		[T in TMove]: TStatus | null;
	};
};

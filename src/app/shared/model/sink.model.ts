export class Sink {
    constructor(
        public id: number,
        public reference: string,
        public status: string,
        public type: string,
        public lenght: number,
        public diameter: number,
        public plumbOption: string,
        public pipeLenght: number,
        public client: string,
        public address: string,
        public observation: string,
    ) {
    }
}

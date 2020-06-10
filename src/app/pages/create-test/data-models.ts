export class Survey{
    constructor( 
        public ID: number,
        public Title: string,
        public Question: Question[]
       
        ){}
}

export class Question{
    constructor( 
        public text: string,
        public options: string[],
        public answer:number,
       
        ){}
}



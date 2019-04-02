import { Card } from './card';

class Set{
    cards : Card[];
    fileCSV : string;
    fileImage : string;
    info : string;
    myCount : number;
    name : string;
    percentComplete : number;
    totalCards : number;
    year : number;

    function countCards(){
        this.myCount = this.cards.length;
        this.percentComplete = (this.myCount / this.totalCards) * 100;
    }
}


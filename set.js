"use strict";
exports.__esModule = true;
var Set = /** @class */ (function () {
    function Set() {
    }
    return Set;
}());
function countCards() {
    this.myCount = this.cards.length;
    this.percentComplete = (this.myCount / this.totalCards) * 100;
}

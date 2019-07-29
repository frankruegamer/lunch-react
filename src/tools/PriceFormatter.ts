export default class PriceFormatter {

    static format(n: number): string {
        return n.toFixed(2) + " €";
    }

}

export default class Utils {
    private constructor() {
    }

    static groupArray<T>(arr: T[], groupSize: number) {
        let result: T[][] = [];
        for (let i = 0; i < arr.length; i += groupSize) {
            result.push(arr.slice(i, i + groupSize))
        }
        return result
    }
}



export default class Utils {
    private constructor() {}

    static isProductionBuild() {
        return process.env.NODE_ENV === 'production';
    }

    static present<T>(value: T | undefined | null, callback: (value: T)=>void, notPresentCallback?: ()=>void){
        if(value) callback(value)
        else if(notPresentCallback) notPresentCallback();
    }

    static matches(input: string, regex: RegExp) {
        let matches = [];
        let current: RegExpMatchArray | null;
        while (current = regex.exec(input)) {
            matches.push(current);
        }
        return matches;
    }

    static getEnv(key: string): string {
        const value = process.env[key]
        if (value)
            return value;
        throw new Error(`${key} is not in env variables!`)
    }
}

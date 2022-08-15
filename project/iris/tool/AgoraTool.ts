export class AgoraTool {

    //merge src to dest
    public static mergeArray(dest: Array<any>, src: Array<any>) {
        for (let i = 0; i < src.length; i++) {
            dest.push(src[i]);
        }
    }


}
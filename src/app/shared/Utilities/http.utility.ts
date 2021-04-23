export class CommonHttpUtility{
    public static constructUrl(firstPart:string,propsObj:{[key:string]:any}){
        let str=Object.entries(propsObj).reduce((prev,val)=>{
            return (Number.isInteger(val[1]) || (!Number.isInteger(val[1]) && !!val[1]))?`${prev}${val[0]}=${val[1]}&`:prev;
            },'?');
        return `${firstPart}${str.substr(0,str.length-1)}`;   
    }
}
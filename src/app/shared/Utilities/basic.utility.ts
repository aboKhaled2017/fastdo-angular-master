export class BasicUtility {
  public static getDatePickerObjectValue(dateStr:string){
       let d=new Date(dateStr);
       return {
         year:d.getFullYear(),
         month:d.getMonth()+1,
         day:d.getDate()
       }  
  }
  public static getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  public static getDateStringFromDateObjectStr(_date){
    return new Date(_date).toLocaleDateString();
  }
  public static downloadFile(path:string){
    let link = document.createElement("a");
    //link.download = "filename";
    link.href = path;
    link.click();
    link.remove();
  }
  public static getExtensionOfFileName(fileName:string){
    let dotIndex=fileName.lastIndexOf('.');
    return fileName.substring(dotIndex+1);
  }
}
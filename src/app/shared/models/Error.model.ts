import { HttpErrorResponse } from "@angular/common/http";
import { CommonUtilityService } from "../services/commonUtility.service";

export interface IErrorModel{
    status:ErrorStatus,
    error?:{[key:string]:any},
    message?:string
    hasValidationError:boolean
}

export enum ErrorStatus{
 serverError,
 notFoundError,
 badRequestError,
 unAuthorizedError,
 frontError
}
export class ErrorModel implements IErrorModel{
    status: ErrorStatus;
    hasValidationError=false;
    error?: { [key: string]: any; };
    message?: string;
    private _noMessage="لقد حدثت مشكلة فى السيرفر";
    constructor(errorRes:HttpErrorResponse,uilityService: CommonUtilityService){
        if (errorRes.error instanceof ErrorEvent) {
            // Client-side errors
            this.status=ErrorStatus.frontError;
            this.message = `Error: ${errorRes.error.message}`;
          } 
          else {
                        // Server-side errors
            if(errorRes.status==400){
                this.status=ErrorStatus.badRequestError;
                if(errorRes.error.errors)
                {
                    this.hasValidationError=true;
                    this.error=uilityService.convertObjPropsToCamleCseString(errorRes.error.errors);
                }
                else{
                    this.message=this._noMessage;
                }
            }
            else if(errorRes.status==404){
                this.status=ErrorStatus.notFoundError;
                if(errorRes.error.errors)
                {
                    this.hasValidationError=true;
                    this.error=uilityService.convertObjPropsToCamleCseString(errorRes.error.errors);
                }
                else{
                    this.message=this._noMessage;
                }
            }
            else {
                this.status=ErrorStatus.serverError;
                this.message=(errorRes.error['errors']&& errorRes.error['errors']['G'])?errorRes.error['errors']['G'] : this._noMessage;
            }
          }
        
    }
}
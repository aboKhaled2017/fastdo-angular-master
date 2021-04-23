import { BehaviorSubject, Subject } from "rxjs";

export class LoaderService {
  public isLoading=new Subject<boolean>();
  public isBackgroundLoading=new Subject<boolean>();
  public skipNextRequest=false;
  constructor() { }
}

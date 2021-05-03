import { ChatAdapter, IChatGroupAdapter, Group, Message, ChatParticipantStatus, ParticipantResponse, ChatParticipantType, IChatParticipant, MessageType } from 'ng-chat';
import { Observable, of, pipe, Subject } from 'rxjs';
import { delay, map, observeOn, retry} from "rxjs/operators";
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service.';
import { IGetTechQuesViewModel } from './models/QuestionResponseView.model';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';

@Injectable()
export class TechSupportAdapter extends ChatAdapter implements IChatGroupAdapter
{

 public userId: string;
 public connectionId:string;
 private lastFetchedMessagesHistory:IGetTechQuesViewModel[]=[];
 onFetchMessagesHistory=new Subject<Message[]>();
 currentUser:User;
 isApiCalled=false;
  private hubConnection: signalR.HubConnection

    constructor(private http: HttpClient,private authService:AuthService,private toastService:ToastService) {
        super();
        authService.currentUser.subscribe(u=>{
            this.currentUser=u;
           
            if(u && u.id){   
            this.userId=u.id;       
            this.initializeConnection();
            of([]).pipe(delay(0)).subscribe(()=>{
                this.getAllCustomerQuestionMessages();
            });
        }
        });
          
    }
    private initializeConnection(): void {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(environment.techSupportChatHubUrl,{accessTokenFactory:()=>this.authService.token,logMessageContent:true})
        .build();
        
        this.hubConnection
        .start()
        .then(() => {
            this.initializeListeners();
            console.log('connected to signalR') 
        })
        .catch(err=>{
            this.toastService.showError(`Error while starting SignalR connection: ${err}`);
        });
        window['hub']=this.hubConnection;
    }

    private initializeListeners(): void {
        
        this.hubConnection.on("onQuestionSeen", (q:IGetTechQuesViewModel) => {
            /* let replyMessage = new Message();

            replyMessage.message = q.message;
            replyMessage.dateSent = new Date(q.createdAt);

            replyMessage.fromId = q.createdAt;
            replyMessage.toId = 1;
            let user = TechSupportAdapter.AllParticipants.find(x => x.id == 1);

            this.onMessageReceived(user, replyMessage); */
            this.toastService.showInfo(`الدعم الفنى شاهد رسالتك (${q.message})`);
        });

        this.hubConnection.on("onResponseForQuestion", (q:IGetTechQuesViewModel) => {
            console.log('origninal question')
           // console.log(question)
            console.log('response question')
            console.log(q)
            let replyMessage = new Message();

            replyMessage.message = q.message;
            replyMessage.dateSent = new Date(q.createdAt);
            replyMessage.fromId = 1;
            replyMessage.toId = this.userId;
            let user = TechSupportAdapter.AllParticipants.find(x => x.id == 1);
            this.onMessageReceived(user, replyMessage);
        // Handle the received response to ng-chat
        //this.onFriendsListChanged(participantsResponse.filter(x => x.participant.id != this.userId));
        });
    }

    private static AllParticipants: IChatParticipant[] = [
    {
        participantType: ChatParticipantType.User,
        id: 1,
        displayName: "ممثل الدعم الفنى",
        avatar: "../../../../assets/avatar1.jpg",
        status: ChatParticipantStatus.Away
    }];

    listFriends(): Observable<ParticipantResponse[]> {
        return of(TechSupportAdapter.AllParticipants.map(user => {
            let participantResponse = new ParticipantResponse();

            participantResponse.participant = user;
            participantResponse.metadata = {
                totalUnreadMessages: 0
            }

            return participantResponse;
        }));
    }

    getMessageHistory(destinataryId: any): Observable<Message[]> {
        console.log('from message historey')     
        return this.onFetchMessagesHistory;
    }

    sendMessage(message: Message): void {

            if (this.hubConnection && this.hubConnection.state == signalR.HubConnectionState.Connected)
        {
            this.hubConnection.invoke('onCustomerSendMessage',message.message)
            .then(()=>{
                this.toastService.showSuccess('تم ارسال رسالتك بجاح للدعم الفنى');
            })
        .catch(err=>{
            console.log(err)
            this.toastService.showError("لقد فشل الارسال حاول مرة اخرى")
        });
        }
    }

    groupCreated(group: Group): void {
        /* TechSupportAdapter.AllParticipants.push(group);

        TechSupportAdapter.AllParticipants = TechSupportAdapter.AllParticipants.sort((first, second) =>
            second.displayName > first.displayName ? -1 : 1
        );

        // Trigger update of friends list
        this.listFriends().subscribe(response => {
            this.onFriendsListChanged(response);
        }); */
    }

    getAllCustomerQuestionMessages(){
        if(this.isApiCalled)return;
        this.isApiCalled=true;
        this.http.get<IGetTechQuesViewModel[]>(`${environment.apiUrl}/techsupport`)
        .pipe(retry(5),
            map(data=>{
            this.lastFetchedMessagesHistory=data;
            let list:Partial<Message>[]=[];
            data.reverse().forEach(el=>{
              list.push({
                  fromId:this.userId,
                  message:el.message,
                  dateSeen:el.seenAt?new Date(el.seenAt):null,
                  dateSent:new Date(el.createdAt),
                  toId:1
              });
              el.responses.forEach(r=>{
               list.push({
                   fromId:1,
                   message:r.message,
                    dateSeen:r.seenAt?new Date(r.seenAt):null,
                    dateSent:new Date(r.createdAt),
                    toId:this.userId
               });
              });
            });
            return list as Message[];
        })).subscribe(data=>{
          this.onFetchMessagesHistory.next(data);
        });
    }
}
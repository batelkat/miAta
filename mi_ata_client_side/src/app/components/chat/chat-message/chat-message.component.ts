import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import io from 'socket.io-client';
import { User } from 'src/app/provider/models/user.model';
import { UsersService } from 'src/app/provider/services/users.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token.service';
import { ChatService } from '../chat.service';
import { Message } from './../models/message.model';
// import Swal from 'sweetalert2';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  @Input() partnerData: User;

  receiver: string;

  user: any;
  message: string;
  receiverData: any;
  messagesArray: Message[] = [];
  messageData: Message;
  socket: any;
  typingMessage;
  typing = false;
  isOnline = false;
  PopUpFlag = true;


  public eventMock;
  public eventPosMock;

  private destroy: Subject<void> = new Subject();

  public direction =
    Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : Math.random() > 0.5 ? 'right' : 'left';
  public toggled = false;
  public content = ' ';
  showBadWordError: boolean = false;


  constructor(
    private tokenService: TokenService,
    private msgService: ChatService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    this.socket = io(environment.serverAddress);
  }


  ngOnInit() {
    this.scrollToBottom();

    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiver = params.userId;
      this.GetUserByUsername(this.receiver);

      this.socket.on('refreshPage', () => {
        debugger
        this.GetUserByUsername(this.receiver);
      });
    });

    this.socket.on('is_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });
    this.msgService.selectedSuggestedQuestion$.pipe(takeUntil(this.destroy)).subscribe((questionBody: string) => {
      this.insertSuggestedQuestion(questionBody);
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  ngAfterViewInit() {
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };

    this.socket.emit('join chat', params);
  }


  GetUserByUsername(name) {
    this.usersService.GetUserById(name).subscribe(data => {
      this.receiverData = data.result;
      this.GetMessages(this.user._id, data.result._id);
    });
  }

  GetMessages(senderId, receiverId) {
    this.msgService.GetAllMessages(senderId, receiverId).subscribe(data => {
      debugger
      this.messagesArray = data.messages.message;
    });
  }

  insertSuggestedQuestion(questionBody: string) {
    this.message = questionBody;
  }

  SendMessage() {
    if (this.message) {
      const badWords = ['מניאק', 'בנזונה', 'זונה', 'חרא'];
      const messageWords = this.message.split(' ');

      for (let i = 0; i < messageWords.length; i++) {
        if (this.authService.badWords.includes(messageWords[i].toLowerCase())) {
          // messageWords[i] = '***';
          this.showBadWordError = true;
          return;
        }
      }
      this.showBadWordError = false;
      // const outputMessage = messageWords.join(' ');
      const outputMessage = this.message;
      this.msgService
        .SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, outputMessage)
        .subscribe((data) => {
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
  }

  // openSurveyPopup() {
  //   // if (this.PopUpFlag === true) {
  //   // this.PopUpFlag = false;
    
  //   Swal.fire({
  //     icon: 'info',
  //     html:
  //       'נשמח אם תשתתף בשאלון אנונימי' +
  //       '<a href="//sweetalert2.github.io"> לשאלון לחץ כאן</a> '
  //     ,
  //     showCloseButton: true,
  //     showConfirmButton: false
  //   });
  //   // setTimeout(() => {
  //   //   Swal.fire({
  //   //     icon: 'info',
  //   //     html:
  //   //       'נשמח אם תשתתף בשאלון אנונימי' +
  //   //       '<a href="//sweetalert2.github.io"> לשאלון לחץ כאן</a> '
  //   //     ,
  //   //     showCloseButton: true,
  //   //     showConfirmButton: false

  //   //   });
  //   // }, 10000);
  //   // }
  // }

  Toggled() {
    this.toggled = !this.toggled;
  }

  IsTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiver
      });
    }, 500);
  }

  // ngOnDestroy(): void {
  //   this.openSurveyPopup();
  // }
}

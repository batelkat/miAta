import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './layout/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/auth/login/login.component';
import { PeopleComponent } from './components/people/people.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthTabsComponent } from './components/auth/auth-tabs/auth-tabs.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginAsGuestComponent } from './components/auth/login-as-guest/login-as-guest.component';
import { SelectService } from './provider/services/select.service';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { GoodToKnowComponent } from './components/chat/good-to-know/good-to-know.component';
import { QuestionsComponent } from './components/chat/questions/questions.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatButtonModule } from '@angular/material/button';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { EnumPipe } from './provider/pipes/enum.pipe';
import { environment } from 'src/environments/environment';
import { PostChatUserReviewComponent } from './components/chat/post-chat-user-review/post-chat-user-review.component';

const config: SocketIoConfig = { url: environment.serverAddress, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    LoginComponent,
    PeopleComponent,
    ChatComponent,
    ChatMessageComponent,
    AuthTabsComponent,
    SignupComponent,
    LoginAsGuestComponent,
    AdminSettingComponent,
    GoodToKnowComponent,
    QuestionsComponent,
    EnumPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ScrollingModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    MatButtonModule],
  providers: [
    CookieService,
    SelectService
  ],
  bootstrap: [AppComponent],
  entryComponents: [PostChatUserReviewComponent]
})
export class AppModule { }

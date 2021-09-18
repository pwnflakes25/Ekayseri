import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService, JoinEvent } from 'src/app/shared/services/event.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event$: Observable<any>;
  eventData: any;
  currentUser: any;
  isLoading = false;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}
  participants = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((resp) => {
      this.eventData = resp;
      this.fetchUserData();
    });
  }

  async fetchUserData() {
    this.currentUser = await this.authService.getCurrentUserInfo();
    this.fetchEvent(this.eventData.eventId, this.eventData.date);
  }

  fetchEvent(eventId: string, date: string) {
    this.event$ = this.eventService.getEvent(eventId, date).pipe(map((eventObj: any) => {
      eventObj[0].hasJoined =  eventObj[0].participants.find(user => user.userId === this.currentUser.attributes.sub) ? true : false;
      eventObj[0].fromTime = this.formatTimeTo12H(eventObj[0].fromTime) || null;
      eventObj[0].toTime = this.formatTimeTo12H(eventObj[0].toTime) ||null;
      return eventObj[0];
    }));
  }

  formatTimeTo12H(time24) {
    let ts = time24;
    let H = +ts.substr(0, 2);
    let h: any = (H % 12) || 12;
    h = (h < 10)? ("0"+h):h;  // leading 0 at the left for 1 digit hours
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };

  imgUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  async onJoinEvent() {
    try {
      this.isLoading = true;
      const token = (await this.authService.getSession())
      .getAccessToken()
      .getJwtToken();
      const userProfile$ = this.profileService.getProfile(token);
      const userProfile: any = await userProfile$.toPromise();
      console.log(userProfile);
      const payload: JoinEvent = {
        ...this.eventData,
        participant: [{
          userName: `${userProfile[0].firstName} ${userProfile[0].lastName}`,
          userId: this.currentUser.attributes.sub,
        }]
      }
      console.log("payload is:", payload);
      await this.eventService.joinEvent(payload).toPromise();
      this.fetchEvent(this.eventData.eventId, this.eventData.date);
      this.isLoading = false;
    } catch (error) {
      console.log(error); 
    }
  }

  onDeleteEvent() {
    
  }
}

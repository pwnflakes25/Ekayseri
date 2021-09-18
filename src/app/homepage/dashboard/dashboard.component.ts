import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { EventService } from 'src/app/shared/services/event.service';
import { SubSink } from 'subsink';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('eventPaginator', { static: true }) eventPaginator: MatPaginator;
  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;
  events$: Observable<any>;
  private subs = new SubSink();
  news = [];
  allEvents: any[];
  announcements$: any;

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.fetchAnnouncements();
    this.initEventPaginatorListener();
  }


  fetchEvents() {
    this.subs.sink = this.eventService.getEvents().subscribe((resp: any) => {
      this.allEvents = resp.events;
      this.setPageIndexOfEvent();
    });
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  onChangeIndex(event) {
    console.log(event);
    
  }

  fetchAnnouncements() {
    this.announcements$ = this.announcementService.getAnnouncements();
  }

  initEventPaginatorListener() {
    this.subs.sink = this.eventPaginator.page
      .pipe(
        tap(() => {
          this.setPageIndexOfEvent();
        })
      )
      .subscribe();
  }

  setPageIndexOfEvent() {
    this.events$ = of(
      this.allEvents.slice(
        this.eventPaginator.pageIndex * 4,
        this.eventPaginator.pageIndex * 4 + 4
      )
    );
  }

  addEvent() {
    let dialogRef = this.dialog
      .open(AddEventDialogComponent, { panelClass: 'basic-dialog-container' })
      .afterClosed()
      .subscribe((dialogResult) => {
        this.fetchEvents();
      });
  }
}

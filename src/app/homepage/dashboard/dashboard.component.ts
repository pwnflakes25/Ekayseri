import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  events$: Observable<any>;
  private subs = new SubSink();
  news = [];
  allEvents: any[];

  constructor(private dialog: MatDialog, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.initEventPaginatorListener();
  }

  fetchEvents() {
    this.subs.sink = this.eventService.getEvents().subscribe((resp: any) => {
      this.allEvents = resp.events;
      this.setPageIndexOfEvent();
    });
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

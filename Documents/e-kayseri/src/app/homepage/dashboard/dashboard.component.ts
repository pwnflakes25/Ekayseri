import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { EventService } from 'src/app/shared/services/event.service';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  events$: Observable<any>;
  news = [
    {
      title: 'News 1',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
    },
    {
      title: 'News 2',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
    },
    {
      title: 'News 3',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
    },
    {
      title: 'News 4',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
    },
  ];

  constructor(private dialog: MatDialog, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.events$ = this.eventService.getEvents().pipe(map(resp => resp[0]));
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

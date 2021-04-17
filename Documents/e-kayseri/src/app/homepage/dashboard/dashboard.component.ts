import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  events = [
    {
      title: 'Event 1',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
      quota: 10,
      joined: 5,
    },
    {
      title: 'Event 1',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
      quota: 10,
      joined: 5,
    },
    {
      title: 'Event 1',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
      quota: 10,
      joined: 5,
    },
    {
      title: 'Event 1',
      date: '12/10/20',
      description: 'A simple and quick description about the event',
      quota: 10,
      joined: 5,
    },
  ]

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
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

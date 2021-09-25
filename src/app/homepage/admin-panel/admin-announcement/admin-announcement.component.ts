import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { SubSink } from 'subsink';
import { AddAnnouncementDialogComponent } from '../../dashboard/add-announcement-dialog/add-announcement-dialog.component';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.scss']
})
export class AdminAnnouncementComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  dataCount;
  announcements = new MatTableDataSource([]);
  searchInput = new FormControl(null);
  subs = new SubSink();
  isLoading = true;
  displayedColumns = ['title', 'author', 'date', 'description', 'actions'];
    constructor(private announcementService: AnnouncementService, private dialog: MatDialog, private utilService: UtilityService) { }
  
    ngOnInit(): void {
      this.fetchAnnouncements();
    }
  
    fetchAnnouncements() {
      this.subs.sink = this.announcementService.getAnnouncements().subscribe((resp: any) => {
        this.announcements.data = resp.announcementsArray;
        this.announcements.paginator = this.paginator;
        this.isLoading = false;
      });
    }
  
    onAddAnnouncement() {
      let dialogRef = this.dialog
        .open(AddAnnouncementDialogComponent, { panelClass: 'basic-dialog-container' })
        .afterClosed()
        .subscribe((dialogResult) => {
          this.fetchAnnouncements();
        });
    }
  
    onEditAnnouncement(element) {
      let dialogRef = this.dialog
      .open(AddAnnouncementDialogComponent, { panelClass: 'basic-dialog-container', data: element})
      .afterClosed()
      .subscribe((dialogResult) => {
        this.fetchAnnouncements();
      });
    }
  
    // async onDeleteAnnouncement(element) {
    //   console.log("element is:", element);
    //   if(confirm("Are you sure you want to delete this announcement?")) {
    //     try {
    //       await this.announcementService.deleteEvent(element.eventId, element.date).toPromise();
    //       this.fetchAnnouncements();
    //     } catch (error) {
    //       console.log(error);
    //       return;
    //     }
    //   } else {
    //     return;
    //   }
    // }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { SubSink } from 'subsink';
import { AssignRoleDialogComponent } from './assign-role-dialog/assign-role-dialog.component';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss'],
})
export class AdminRolesComponent implements OnInit {
  @ViewChild('userPaginator', { static: true }) userPaginator: MatPaginator;
  usersList = new MatTableDataSource([]);
  eventSearchInput = new FormControl(null);
  subs = new SubSink();
  isLoading = true;
  displayedEventTableColumns = ['name', 'roles', 'actions'];
  private _token: any;
  userDataCount: any;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private utilService: UtilityService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getToken().then(resp => {
      this.fetchUsers();
    })
  }

  async getToken() {
    this._token = (await this.authService.getSession())
      .getAccessToken()
      .getJwtToken();
  }

  fetchUsers() {
    this.isLoading = true;
    this.subs.sink = this.profileService
    .getProfiles(this._token)
    .subscribe((users: any) => {
      this.isLoading = false;
      this.usersList.data = users[0].items.map(user => {
        return {...user, fullName: `${user.firstName} ${user.lastName}`}
      });
      this.usersList.paginator = this.userPaginator;
      this.userDataCount = users.length;
    });
  }

  onEditRoles(element) {
    this.subs.sink = this.dialog
      .open(AssignRoleDialogComponent, {
        panelClass: 'basic-dialog-container',
        data: element,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        this.fetchUsers();
      });
  }
}

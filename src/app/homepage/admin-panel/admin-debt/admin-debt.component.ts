import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { tap } from 'rxjs/operators';
import { DebtService } from 'src/app/shared/services/debt.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

interface UserPayment {
  userId: string;
  amount: string;
  date: string;
  duration: string;
  name: string;
  paid: boolean;
  paymentId: string;
}
@Component({
  selector: 'app-admin-debt',
  templateUrl: './admin-debt.component.html',
  styleUrls: ['./admin-debt.component.scss'],
})
export class AdminDebtComponent implements OnInit, AfterViewInit {
  @ViewChild('userPaginator', { static: true }) userPaginator: MatPaginator;
  @ViewChild('debtPaginator', { static: true }) debtPaginator: MatPaginator;
  userSearchInput = new FormControl(null);
  debtSearchInput = new FormControl(null);
  userSelection = new SelectionModel<any>(true, []);
  debtSelection = new SelectionModel<any>(true, []);
  displayedUserTableColumns = ['select', 'first_name', 'last_name'];
  displayedDebtTableColumns = ['select', 'name', 'date_issued', 'status'];
  allDebts: any[];
  allUsers: any[];
  userList = new MatTableDataSource([]);
  debtList = new MatTableDataSource([]);
  userDataCount = 0;
  debtDataCount = 0;
  subs = new SubSink();
  currentDate = new Date();
  fromDate = new FormControl(new Date(this.currentDate.getFullYear(), 1, 1));
  toDate = new FormControl(new Date(this.currentDate.getFullYear(), 11, 1));
  _token;
  isLoading = true;

  constructor(
    private debtService: DebtService,
    private utilService: UtilityService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getToken().then(() => {
      this.fetchDebts();
    });
  }

  ngAfterViewInit() {}

  // initPaginatorListener() {
  //   this.subs.sink = this.userPaginator.page
  //     .pipe(
  //       tap(() => {
  //         this.setPageIndexOfData('user');
  //       })
  //     )
  //     .subscribe();

  //   this.subs.sink = this.debtPaginator.page
  //     .pipe(
  //       tap(() => {
  //         this.setPageIndexOfData('debt');
  //       })
  //     )
  //     .subscribe();
  // }

  setPageIndexOfData(type: string) {
    switch (type) {
      case 'debt':
        this.debtList.data = this.allDebts[this.debtPaginator.pageIndex].item;
        break;
      case 'user':
        this.userList.data = this.allUsers[this.userPaginator.pageIndex];
        break;
    }
  }

  async getToken() {
    this._token = (await this.authService.getSession())
      .getAccessToken()
      .getJwtToken();
  }

  fetchDebts() {
    this.isLoading = true;
    this.subs.sink = this.debtService
      .getDebts(
        this.utilService.dateToISO(this.fromDate.value),
        this.utilService.dateToISO(this.toDate.value)
      )
      .subscribe((debts: any) => {
        console.log('fetched debts are:', debts);
        this.allDebts = debts.Items;
        this.debtList.data = this.allDebts;
        this.debtList.paginator = this.debtPaginator;
        this.debtDataCount = debts.Count;
        this.fetchUsers();
      });
  }

  async fetchUsers() {
    this.subs.sink = this.profileService
      .getKayseriUserProfiles(this._token)
      .subscribe((users: any) => {
        this.isLoading = false;
        const issuedUserIds = this.getAllIssuedUsers();
        this.allUsers = users.Items.filter(
          (users) => !issuedUserIds.includes(users.userId)
        );
        this.userList.data = this.allUsers;
        this.userList.paginator = this.userPaginator;
        this.userDataCount = this.allUsers.length;
        this.styleCheckboxes();
      });
  }

  getAllIssuedUsers() {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate.setDate(1);
    const issuedUsers = this.allDebts
      .map((debt) => ({ ...debt, date: new Date(debt.date) }))
      .filter((mappedDebt) => mappedDebt.date >= startDate) //get users who has a debt this month or bigger
      .map((filteredDebt) => filteredDebt.UserId);
    console.log('user ids who has been issued are: ', [
      ...new Set(issuedUsers),
    ]);
    return [...new Set(issuedUsers)];
  }

  fetchSingleDebt() {
    this.subs.sink = this.debtService
      .getSingleDebt('payment16307783036316dq')
      .subscribe((debt) => {
        console.log(debt);
      });
  }

  styleCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    console.log(checkboxes.length);
    for (let i = checkboxes.length - 1; i >= 0; i--) {
      if (checkboxes[i]) {
        checkboxes[i].classList.add('filled-in');
      }
    }
  }

  isAllSelected(type: string) {
    switch (type) {
      case 'user':
        return !!(
          this.userSelection.selected.length === this.userList.data.length
        );
      case 'debt':
        return !!(
          this.debtSelection.selected.length === this.debtList.data.length
        );
    }
  }

  masterToggle(type: string) {
    switch (type) {
      case 'user':
        this.isAllSelected(type)
          ? this.userSelection.clear()
          : this.userList.data.forEach((row) => this.userSelection.select(row));
        break;
      case 'debt':
        this.isAllSelected(type)
          ? this.debtSelection.clear()
          : this.debtList.data.forEach((row) => this.debtSelection.select(row));
    }
  }

  checkboxLabel(type: string, row?: any): string {
    switch (type) {
      case 'user':
        if (!row) {
          return `${this.isAllSelected(type) ? 'select' : 'deselect'} all`;
        }
        return `${
          this.userSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.position + 1}`;
      case 'debt':
        if (!row) {
          return `${this.isAllSelected(type) ? 'select' : 'deselect'} all`;
        }
        return `${
          this.userSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.position + 1}`;
    }
  }

  async onVerifyDebt() {
    try {
      const debts = this.debtSelection.selected.map(
        (payment: UserPayment) => ({
          paymentId: payment.paymentId,
          paidStatus: true,
          date: payment.date,
        })
      );
      const payload = {
        toBePaid: debts
      }
      await this.debtService.verifyDebt(payload).toPromise();
      this.debtSelection.clear();
      this.fetchDebts();
    } catch (error) {
      console.log(error);
    }
  }

  async onIssueDebt() {
    try {
      const currentUserId = (await this.authService.getCurrentUserInfo())
        .attributes.sub;
      const userProfile$ = this.profileService.getProfile(this._token);
      const userProfile: any = await userProfile$.toPromise();
      const payload = {
        users: this.userSelection.selected.map((user) => ({
          authorName: `${userProfile[0].firstName} ${userProfile[0].lastName}`,
          authorId: currentUserId,
          name: `${user.firstName} ${user.lastName}`,
          amount: '7',
          duration: '2',
          date: this.utilService.dateToISO(new Date()),
          userId: user.userId,
        })),
      };
      await this.debtService.postDebt(payload).toPromise();
      this.userSelection.clear();
      this.fetchDebts();
    } catch (error) {
      console.log(error);
    }
  }
}

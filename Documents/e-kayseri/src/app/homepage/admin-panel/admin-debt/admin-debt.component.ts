import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-debt',
  templateUrl: './admin-debt.component.html',
  styleUrls: ['./admin-debt.component.scss']
})
export class AdminDebtComponent implements OnInit, AfterViewInit {
userSelection = new SelectionModel<any>(true, []);
debtSelection = new SelectionModel<any>(true, []);
displayedUserTableColumns = ['select', 'first_name', 'last_name'];
displayedDebtTableColumns = ['select', 'name', 'date_issued', 'status'];
userList = new MatTableDataSource([]);
debtList = new MatTableDataSource([]);


dummyUsers = [
  {
    firstName: "hasan",
    lastName: "Albanna",
  },
  {
    firstName: "Hamoodi",
    lastName: "Abu Alaa"
  }
]

dummyDebt = [
  {
    name: "hasan",
    dateIssued: "01/09/2021",
    status: "unpaid"
  },
  {
    name: "Hamoodi",
    dateIssued: "01/08/2021",
    status: "unpaid"
  }
]

  constructor() { }

  ngOnInit(): void {
    this.userList.data = this.dummyUsers;
    this.debtList.data = this.dummyDebt;
  }

  ngAfterViewInit() {
    this.styleCheckboxes();
  }

  styleCheckboxes() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (let i = checkboxes.length - 1; i >= 0; i--) {
      if(checkboxes[i]){
        checkboxes[i].classList.add('filled-in');
      }
    }
  }

  isAllSelected(type: string) {
    switch (type) {
      case 'user':
        return !!(this.userSelection.selected.length === this.userList.data.length);
      case 'debt':
        return !!(this.debtSelection.selected.length === this.debtList.data.length);
    }
  }

  masterToggle(type: string) {
    switch (type) {
      case 'user':
        this.isAllSelected(type) ? this.userSelection.clear() : this.userList.data.forEach((row) => this.userSelection.select(row));
        break;
      case 'debt':
        this.isAllSelected(type) ? this.debtSelection.clear() : this.debtList.data.forEach((row) => this.debtSelection.select(row));
    }
  }

  checkboxLabel(type:string, row?: any): string {
    switch (type) {
      case 'user':
        if (!row) {
          return `${this.isAllSelected(type) ? 'select' : 'deselect'} all`;
        }
        return `${this.userSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
      case 'debt':
        if (!row) {
          return `${this.isAllSelected(type) ? 'select' : 'deselect'} all`;
        }
        return `${this.userSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
  }

}

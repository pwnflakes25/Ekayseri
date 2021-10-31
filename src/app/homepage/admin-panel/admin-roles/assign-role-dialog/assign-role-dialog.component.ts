import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { SubSink } from 'subsink';
declare const M;

@Component({
  selector: 'app-assign-role-dialog',
  templateUrl: './assign-role-dialog.component.html',
  styleUrls: ['./assign-role-dialog.component.scss'],
})
export class AssignRoleDialogComponent implements OnInit {
  roleForm: FormGroup;
  isLoading: boolean;
  private subs = new SubSink();
  user = {
    roles: ['user', 'admin', 'bendahara', 'divkom']
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private utilService: UtilityService,
    public dialogRef: MatDialogRef<AssignRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.initEventForm();
    if (this.data) {
      this.patchForm();
    }
  }

  ngAfterViewInit(): void {
  }

  initEventForm() {
    this.roleForm = this.fb.group({
      editedUserId: [this.data.userId],
      roles: [[], Validators.required],
    });
  }

  patchForm() {
    this.roleForm.patchValue(this.data);
  }

  printSelections() {
    console.log(this.roleForm.get('roles').value);
  }

  onSubmit() {
    this.formatPayload();
  }

  async formatPayload() {
    this.isLoading = true;
    try {
      const payload = this.roleForm.value;
      await this.updateRoles(payload);
      this.isLoading = false;
      this.dialogRef.close(this.roleForm.value);
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  updateRoles(payload) {
    return this.profileService.updateRoles(payload).toPromise();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

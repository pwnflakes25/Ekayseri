import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { SubSink } from 'subsink';

interface Announcement {
  annoucementId?: string;
  title: string;
  content: string;
  date: string;
  authorName: string;
}

@Component({
  selector: 'app-add-announcement-dialog',
  templateUrl: './add-announcement-dialog.component.html',
  styleUrls: ['./add-announcement-dialog.component.scss'],
})
export class AddAnnouncementDialogComponent implements OnInit, OnDestroy {
  announcementForm: FormGroup;
  isLoading: boolean;
  subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private utilService: UtilityService,
    private authService: AuthService,
    private profileService: ProfileService,
    private announcementService: AnnouncementService,
    public dialogRef: MatDialogRef<AddAnnouncementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.initAnnouncementForm();
    if(this.data) {
      this.patchForm(this.data);
    }
  }

  initAnnouncementForm() {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      date: [new Date()],
      authorName: [],
    });
  }

  patchForm(data: Announcement) {
    this.announcementForm.patchValue(data);
  } 

  async formatPayload() {
    this.isLoading = true;
    try {
      const token = (await this.authService.getSession())
        .getAccessToken()
        .getJwtToken();
      const userProfile$ = this.profileService.getProfile(token);
      const userProfile: any = await userProfile$.toPromise();
      this.announcementForm.patchValue({
        authorName: `${userProfile[0].firstName} ${userProfile[0].lastName}`,
      });
      if (this.data) {
        const payload = this.announcementForm.value;
        payload.announcementId = this.data.announcementId;
        await this.updateAnnouncement(payload);
      } else {
        this.announcementForm.patchValue({
          date: this.utilService.dateToISO(this.announcementForm.get('date').value),
        });
        await this.addAnnouncement(this.announcementForm.value);
      }
      this.isLoading = false;
      this.dialogRef.close(this.announcementForm.value);
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  onSubmit() {
    this.formatPayload();
  }

  addAnnouncement(payload: Announcement) {
    return this.announcementService.addAnnouncement(payload).toPromise();
  }

  updateAnnouncement(payload: Announcement) {
    return this.announcementService.updateAnnouncement(payload).toPromise();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

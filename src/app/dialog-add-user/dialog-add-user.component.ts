import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule ,MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date | null = null;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  saveUser() {
    console.log(this.user);
    this.user.birthDate = this.birthDate?.getTime() ?? 0;
    this.loading = true;
    const usersCollectionRef = collection(this.firestore, 'users');

    addDoc(usersCollectionRef, this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding user finished', result);
        this.cdRef.detectChanges();
        this.dialogRef.close();
      });
  }
}
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule ,MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date | null = null;

  saveUser() {
    console.log(this.user);
    this.user.birthDate = this.birthDate?.getTime() ?? 0;

  }
}
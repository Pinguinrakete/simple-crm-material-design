import { Component, OnInit } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, getFirestore, query, where, getDocs } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule ,MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  allUsers:any = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const usersCollectionRef = collection(this.firestore, 'users');

    getDocs(usersCollectionRef)
      .then((querySnapshot) => {
        const users: any[] = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        // console.log('Users from Firestore:', users);
        this.allUsers = users;
        console.log(this.allUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

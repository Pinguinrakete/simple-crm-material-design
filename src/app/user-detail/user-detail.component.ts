import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId: string | null = null;
  user:any;

  constructor(private route:ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id');
      if (this.userId) {
        this.getUser(this.userId);
      } else {
        console.error('User ID is null or undefined');
      }
    });
  }

  getUser(userId:string) {
    const userDocRef = doc(this.firestore, 'users', userId);

    getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userWithId = { id: docSnapshot.id, ...docSnapshot.data() };
          this.user = userWithId;
        } else {
          console.log('No such user!');
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
    }
}
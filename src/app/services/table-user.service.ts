import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from '../table-user/table-user.component';

@Injectable({
  providedIn: 'root',
})
export class TableUserService {
  users = new BehaviorSubject<User[]>([]);
  private itemsCollection: AngularFirestoreCollection<User>;
  constructor(private firestore: AngularFirestore) {}

  getUser() {
    this.itemsCollection = this.firestore.collection<User>('User'); //lay thong tin
    this.itemsCollection
      .valueChanges({ idField: 'key' })
      .subscribe((users: User[]) => {
        this.users.next(users);
      });
  }

  createUser(user: User) {
    return this.firestore.collection('User').add(user);
  }

  updateUser(user: User, id: string) {
    console.log(id);
    this.firestore.doc('User/' + id).update(user);
  }

  deleteUser(id: string) {
    const a = this.firestore.doc('User/' + id).delete();
    console.log(a);
  }
}

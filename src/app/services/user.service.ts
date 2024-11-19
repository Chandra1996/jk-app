import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.type';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: AngularFirestore
  ) { }

  createUser(user: User) {
    return this.afs.collection('Users').doc(user.docId).set(user);
  }

  getUser(docId: string) {
    return this.afs.collection('Users').doc(docId).get();
  }

  updateUser(user: User | Partial<User>, docId: string) {
    return this.afs.collection('Users').doc(docId).set(user, { merge: true });
  } 

  deleteUser(docId: string) {
    return this.afs.collection('Users').doc(docId).delete();
  }
}

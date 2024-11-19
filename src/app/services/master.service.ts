import { Injectable } from '@angular/core';
import { UserMaster } from '../interfaces/user.type';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addToUserMaster(userMasterInfo: UserMaster) {
    const docId = 'users_01'
    let masterObj = {
      users: {
        [userMasterInfo.docId]: userMasterInfo
      }
    }
    return this.afs.collection('Master').doc(docId).set(masterObj, { merge: true });
  }

  getUserMaster() {
    const docId = 'users_01'
    return this.afs.collection('Master').doc(docId).get();
  }

  updateUserMaster(userMasterInfo:  Partial<UserMaster>, userDocId: string) {
    const docId = 'users_01'
    let masterObj = {
      users: {
        [userDocId]: userMasterInfo
      }
    }
    return this.afs.collection('Master').doc(docId).set(masterObj, { merge: true });
  }

  deleteUserMaster(userDocId: string) {
    const docId = 'users_01';
  
    this.getUserMaster().subscribe((masterDoc: any) => {
      let masterData = masterDoc.data();
      
      // Check if users object exists before trying to delete the user
      if (masterData && masterData.users && masterData.users[userDocId]) {
        delete masterData.users[userDocId];
        
        // Use 'set' with { merge: true } to only update the users field
        this.afs.collection('Master').doc(docId).set(masterData)
          .then(() => console.log('User removed successfully'))
          .catch((error) => console.error('Error removing user:', error));
      } else {
        console.error('User not found in master data');
      }
    });
  }
  

  
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DocumentsManagementService {

  constructor(
    private afs: AngularFirestore
  ) { }

  createDocument(documentInfo: any) {
    return this.afs.collection('Documents').doc(documentInfo.docId).set(documentInfo);
  }

  deleteDocument(docId: string) {
    return this.afs.collection('Documents').doc(docId).delete();
  }

  getAlldocuments() {
    return this.afs.collection('Documents').get();
  }
}

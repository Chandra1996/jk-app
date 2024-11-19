import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private afs: AngularFirestore) { }

  getAllChats(docId: string) {
    return this.afs.collection('Chats').doc(docId).get();
  }

  updateChat(docId: string, chat: any) {
    return this.afs.collection('Chats').doc(docId).set(chat, { merge: true });
  }
}

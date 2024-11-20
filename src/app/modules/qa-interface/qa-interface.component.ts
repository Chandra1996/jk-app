import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-qa-interface',
  templateUrl: './qa-interface.component.html',
  styleUrls: ['./qa-interface.component.scss']
})
export class QaInterfaceComponent implements OnInit {
  userDocId: any;

  constructor(
    private http: HttpClient,
    private chatService: ChatsService,
    private authService: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getChats()
  }

  async getChats() {
    let userDocId: any = await this.authService.getdocId();
    console.log(userDocId);
    this.userDocId = userDocId;
    this.chatService.getAllChats(userDocId).subscribe((chats: any) => {
      console.log(chats);
      if (chats.exists) {
        this.chatMessages = chats.data().chats;
        console.log(chats.data());
      }
    })
  }
  question: string = '';
  chatMessages: Array<{ type: string, text: string }> = [];
  isAsking: boolean = false;  // To track if a question is being asked


  // Enable the Ask button when there is input in the question field
  enableAskButton() {
    return this.question.length > 0;
  }

  // Function to handle asking a question
  askQuestion() {
    // Add the question to chat
    this.chatMessages.push({ type: 'question', text: this.question });
    this.isAsking = true; // Disable Ask button

    const apiUrl = 'https://api.chucknorris.io/jokes/random'; // Example API for random answer

    this.http.get<{ value: string }>(apiUrl).pipe(
      // Handle API call errors
      catchError((error) => {
        console.error('Error fetching answer from API:', error);
        // Provide a fallback answer
        const fallbackAnswer = 'Sorry, I could not fetch a response right now. Please try again later.';
        this.chatMessages.push({ type: 'answer', text: fallbackAnswer });

        // Re-enable the button and clear input
        this.isAsking = false;
        this.question = '';
        return []; // Return an empty observable to terminate the chain
      })
    ).subscribe(async (response) => {
      // Add the answer to chat after the question
      if (response && response.value) {
        this.chatMessages.push({ type: 'answer', text: response.value });
      }

      try {
        // Update chat in Firestore
        const chatObj = {
          chats: this.chatMessages,
          docId: this.userDocId
        };
        await this.chatService.updateChat(this.userDocId, chatObj);
        console.log('Chat updated successfully:', this.chatMessages);
      } catch (firestoreError) {
        console.error('Error updating chat in Firestore:', firestoreError);
        // Optionally, inform the user or retry
      }

      // Clear the question input and re-enable the button
      this.question = '';
      this.isAsking = false;
    });
  }

}

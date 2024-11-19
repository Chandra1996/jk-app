import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { DocumentsManagementService } from 'src/app/services/documents-management.service';

@Component({
  selector: 'app-docs-management',
  templateUrl: './docs-management.component.html',
  styleUrls: ['./docs-management.component.scss']
})
export class DocsManagementComponent implements OnInit {

  constructor(
    private afStore: AngularFireStorage,
    private documentService: DocumentsManagementService,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  selectedFile: File | null = null;
  uploadInProgress = false;
  uploadProgress = 0; // Percentage
  uploadedDocuments: Array<{ fileName: string; uploadDate: Date; status: string }> = [
    {
      fileName: 'Project_Report.pdf',
      uploadDate: new Date('2024-11-10'),
      status: 'Completed'
    },
    {
      fileName: 'Team_Meeting_Minutes.docx',
      uploadDate: new Date('2024-11-12'),
      status: 'Completed'
    },
    {
      fileName: 'Budget_Plan.xlsx',
      uploadDate: new Date('2024-11-15'),
      status: 'Completed'
    }
  ];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile?.name);
    
  }

  getAllDocuments() {
    this.documentService.getAlldocuments().subscribe((documents) => {
      console.log('All documents:', documents);
      this.uploadedDocuments=documents.docs.map((doc:any)=>doc.data())
    })
  }
  // uploadFile() {
  //   if (!this.selectedFile) return;
  //   const bucketPath = 'documents/' + this.selectedFile.name;
  //   const ref = this.afStore.ref(bucketPath);
  //   const task = ref.put(this.selectedFile).snapshotChanges()
  //   task.subscribe(
  //     (snapshot:any) => {
  //       this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     },
  //     (error) => {
  //       this._snackBar.open('Error during upload', 'Error',{duration:3000});
  //       console.error('Error uploading file:', error);
  //     },
  //     () => {
       
  //       this._snackBar.open('File uploaded successfully!', 'Successful',{duration:3000});
  //       this.selectedFile = null;
  //       let documentObject={
  //         fileName: this.selectedFile!.name,
  //         uploadDate: new Date(),
  //         status: 'Completed',
  //         uploadedPath:bucketPath,
  //         docId:this.afs.createId()
  //       }

  //       this.documentService.createDocument(documentObject).then((res)=>{
  //         this.uploadedDocuments.push({
  //           fileName: this.selectedFile!.name,
  //           uploadDate: new Date(),
  //           status: 'Completed',
  //           uploadedPath:bucketPath,
  //           docId:documentObject.docId
  //         });
  //       }).catch((err)=>{
  //         this._snackBar.open('Error during upload', 'Error',{duration:3000});
  //         console.error('Error creating document:',err);
  //       })
  //     }
  //   );
  // }

  uploadFile() {
    if (!this.selectedFile) return;

    this.uploadInProgress = true;
    this.uploadProgress = 0;

    const interval = setInterval(() => {
      this.uploadProgress += 10;

      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.uploadInProgress = false;
        this.uploadedDocuments.push({
          fileName: this.selectedFile!.name,
          uploadDate: new Date(),
          status: 'Completed'
        });
        this.selectedFile = null;
      }
    }, 200); // Simulate upload progress every 200ms
  }

  viewDocument(document: any) {
    console.log('Viewing document:', document.fileName);
  }

  deleteDocument(document: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion
        this.uploadedDocuments = this.uploadedDocuments.filter(doc => doc !== document);
        console.log('Document deleted:', document);
      } else {
        console.log('Delete action cancelled');
      }
    });
  }
}

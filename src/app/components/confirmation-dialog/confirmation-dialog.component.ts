import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  // Close the dialog without confirming
  onCancel(): void {
    this.dialogRef.close(false); // Returning false to indicate cancel action
  }

  // Close the dialog and confirm
  onConfirm(): void {
    this.dialogRef.close(true); // Returning true to confirm the action
  }
}

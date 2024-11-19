import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { User, UserMaster } from 'src/app/interfaces/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private masterService: MasterService,
    private userService: UserService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    console.log('User Management Component Initialized');
    this.getAllUsers()
  }

  roles: string[] = ['Admin', 'Editor', 'Viewer'];
  users: UserMaster[] = [];
 
  filteredUsers = [...this.users];
  searchQuery = '';
  selectedRole = '';

  applySearch() {
    this.filterUsers();
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterUsers();
  }

  applyFilter() {
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (!this.selectedRole || user.role === this.selectedRole)
    );
  }

  async assignRole(user: UserMaster, newRole: string): Promise<void> {
    try {
      // Update the role in the user object
      user.role = newRole;
  
      // Prepare user object for the update
      const userObj: Partial<User> = {
        role: newRole
      };
  
      // Update user in UserService
      await this.userService.updateUser(userObj, user.docId);
  
      // Update user in MasterService
      await this.masterService.updateUserMaster(user, user.docId);
      
    } catch (error) {
      console.error('An error occurred while assigning the role:', error);
    }
  }
  

  async deleteUser(user: UserMaster) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        // Proceed with deletion
        try {
          await this.userService.deleteUser(user.docId);
          await this.masterService.deleteUserMaster(user.docId);
          this.filteredUsers = this.filteredUsers.filter((u) => u !== user);

        } catch (error) {
          console.error('An error occurred while deleting the user:', error);
        }
      } else {
        console.log('Delete action cancelled');
      }
    });
  }

  getAllUsers() {
    this.masterService.getUserMaster().subscribe((res: any) => {
      console.log('Master:', res.data());
      this.users = Object.values(res.data().users);
      this.filteredUsers = [...this.users]
    });
  }
}

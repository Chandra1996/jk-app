import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { User, UserMaster } from 'src/app/interfaces/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  userInfo: User | any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.getUserInfo()
  }
  getUserInfo() {
    this.auth.getCurrentUser().then((user: any) => {
      console.log('User:', user?.uid);
      this.userService.getUser(user?.uid).subscribe((user: any) => {
        this.isAdmin = user.data()?.role === 'Admin'
        this.userInfo = user.data()
      })
    })
  }
  onLogout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async toggleCompleted(change: MatSlideToggleChange): Promise<void> {
    try {
      // Update local isAdmin state based on toggle change
      this.isAdmin = change.checked;
  
      // Prepare user object for update
      const userObj: Partial<User> = {
        docId: this.userInfo?.docId,
        updatedAt: new Date(),
        role: change.checked ? 'Admin' : 'Viewer'
      };
  
      // Prepare master user object for update
      const userMasterObj: Partial<UserMaster> = {
        role: change.checked ? 'Admin' : 'Viewer'
      };
  
      // Update user in UserService
      await this.userService.updateUser(userObj,this.userInfo?.docId);
      console.log('User updated successfully.');
  
      // Update user in MasterService
      if (this.userInfo?.docId) {
        await this.masterService.updateUserMaster(userMasterObj, this.userInfo.docId);
        console.log('UserMaster updated successfully.');
      } else {
        console.error('Error: userInfo.docId is undefined.');
      }
    } catch (error) {
      console.error('An error occurred during user update:', error);
    }
  }
  
}

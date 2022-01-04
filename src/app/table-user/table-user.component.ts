import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TableUserService } from '../services/table-user.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css'],
})
export class TableUserComponent implements OnInit {
  items: User[] = [];
  private itemsCollection: AngularFirestoreCollection<User>;
  displayedColumns = ['id', 'email', 'firstName', 'lastName', 'role', 'action'];
  dataSource = new MatTableDataSource<User>(this.items);

  constructor(
    private readonly afs: AngularFirestore,
    public dialog: MatDialog,
    private userService: TableUserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.users.subscribe((users) => {
      this.items = users;
      this.dataSource.data = users;
    });
  }

  //Phan trang
  @ViewChild('paginator')
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    localStorage.setItem('user', JSON.stringify(this.dataSource.data));
  }

  deleteConfirmationDialog(id: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }
      this.userService.deleteUser(id);
      console.log(id);
    });
  }

  deleteUser(id: any) {
    this.deleteConfirmationDialog(id);
  }
}

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

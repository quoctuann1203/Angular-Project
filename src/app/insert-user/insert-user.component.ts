import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TableUserService } from '../services/table-user.service';
import { User } from '../table-user/table-user.component';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css'],
})
export class InsertUserComponent implements OnInit {
  insertFrm: FormGroup;
  params = '';
  data: any = [];
  editData: any = [];
  idUser: string = '';
  constructor(
    private fb: FormBuilder,
    private itemSrv: TableUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.params.id;
    this.data = JSON.parse(localStorage.getItem('user'));
    if (this.params) {
      this.editData = this.data.filter((item: User) => item.id === this.params);
      this.idUser = this.editData[0].key;
    }

    this.insertFrm = this.fb.group({
      id: ['', Validators.required],
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let item: User = this.insertFrm.value;
    this.router.navigate(['/table-user']);
    if (this.params) {
      this.itemSrv.updateUser(item, this.idUser);
      this.itemSrv.getUser();
    } else {
      this.itemSrv.createUser(item);
      this.itemSrv.getUser();
    }
  }
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  items: Product[]=[];
  private itemsCollection: AngularFirestoreCollection<Product>;
  displayedColumns = ['id', 'name', 'price', 'provider','quantity','action'];
  dataSource = new MatTableDataSource<Product>(this.items);

  constructor(private readonly afs: AngularFirestore,public dialog: MatDialog, private productService : ProductsService) {
    this.itemsCollection = afs.collection<Product>('Products');//lay thong tin
    this.itemsCollection.valueChanges({idField:'key'}).subscribe((products: Product[]) => {
    this.items = products;
    this.dataSource.data = this.items;
    })
    // this.add("8","A8",1,"B",6)
  }

  ngOnInit(): void {
  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
  }

  deleteConfirmationDialog(id : any): void {
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
      this.productService.deleteItem(id).subscribe((item) => {
        console.log(item);
      });
    });
  }

  deleteProduct(id:any) {
    this.deleteConfirmationDialog(id)
  }

  // add (id:string, name:string,  price: number,provider: string,quantity: number){
  //   let pro : Product = {};
  //   pro.id = id;
  //   pro.name = name;
  //   pro.price = price;
  //   pro.provider = provider;
  //   pro.quantity = quantity;

  //   let docid = "8";

  //   //this.itemsCollection.add(it);//thêm với docid tự động tạo

  //   //them vao itemsCollection với docid cụ thể
  //   this.itemsCollection.doc(docid).set(Object.assign({}, pro));//Object.assign({} khong co lenh nay thi se khong them vao firebase duoc
  // }
}

export interface Product {
  id?:string;
  name?: string;
  price?: number;
  provider?: string;
  quantity?: number;
}



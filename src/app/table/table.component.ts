import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  items: Product[]=[];
  private itemsCollection: AngularFirestoreCollection<Product>;
  displayedColumns = ['id', 'name', 'price', 'provider','quantity'];
  dataSource = new MatTableDataSource<Product>(this.items);
  constructor(private cdr: ChangeDetectorRef,private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Product>('Products');
    this.itemsCollection.valueChanges({idField:'key'}).subscribe(products => {
      this.items = products
     this.dataSource.data = this.items;
    })
  }

  ngOnInit(): void {
  }


  // this.cdr
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */

}

export interface Product {
  id:string;
  name: string;
  price: number;
  provider: string;
  quantity: number;
}



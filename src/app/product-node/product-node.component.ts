import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-node',
  templateUrl: './product-node.component.html',
  styleUrls: ['./product-node.component.css'],
})
export class ProductNodeComponent implements OnInit {
  // items: Product[]=[];
  items: any;
  // displayedColumns = ['id', 'name', 'price', 'provider','quantity'];
  constructor(productsrv: ProductsService) {
    this.items = productsrv.getItems();
    // productsrv.getItems().subscribe((item) => {
    //   console.log(item);
    // });
  }

  ngOnInit(): void {}

  @ViewChild('paginator')
  paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource = new MatTableDataSource(this.items);
  //   this.dataSource.paginator = this.paginator;
  // }
}

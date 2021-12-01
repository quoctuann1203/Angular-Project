import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductDescription } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-insert-node',
  templateUrl: './insert-node.component.html',
  styleUrls: ['./insert-node.component.css']
})
export class InsertNodeComponent implements OnInit {
  insertFrm:FormGroup;
  params = ''
  constructor(private fb: FormBuilder, private itemSrv:ProductsService, private route: ActivatedRoute) {
    this.insertFrm = this.fb.group
    ({
        // id: ['',Validators.required],
        name:['',[Validators.required, Validators.maxLength(16)]],
        price: ['',[Validators.required]],
        provider:['',[Validators.required]],
        quantity: ['',[Validators.required]],
        description:['']
    });

  }

  ngOnInit(): void {
    this.params =  this.route.snapshot.params.id
  }

  onSubmit() {
    // if(this.insertFrm.invalid) {
    //   return;
    // }

    let item = new ProductDescription();
				// item.id = this.insertFrm.controls["id"].value;
        item.name = this.insertFrm.controls["name"].value;
        item.price = this.insertFrm.controls["price"].value;
        item.provider = this.insertFrm.controls["provider"].value;
        item.quantity = this.insertFrm.controls["quantity"].value;
        item.description = this.insertFrm.controls["description"].value;
        if(this.params) {
          this.itemSrv.editItem(this.params, item).subscribe(response => console.log('edit',response))
        }else{

          this.itemSrv.insertItem(item).subscribe(data => console.log(data))
        }
        // console.log("id:",item.id);

  }

}

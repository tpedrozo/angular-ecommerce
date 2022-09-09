import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared/services/shared.service";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  productList: Product[] = [];

  constructor(
     private sharedService: SharedService,
     private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.get(null).subscribe({
      next:(data) => {
        if(data.success) {
          this.productList = data.result as Product[];
          console.log(this.productList);
        } else {
            this.sharedService.resultError(null, data.errors, null, 'productService', 'GET');
          }
        },
        error: (error) => {
        this.sharedService.resultError(error, null, null, 'productService', 'GET');
      }
    })
  }

}

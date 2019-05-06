import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private _listFilter: string;

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  filteredProducts: IProduct[];
  errorMessage = '';

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(v: string) {
    this._listFilter = v;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  products: IProduct[];

  constructor(private productService: ProductService) {
    this.listFilter;
  }

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();

    return this.products.filter((product: IProduct) => {
      return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => {
        this.errorMessage = <any>error;
      }
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}

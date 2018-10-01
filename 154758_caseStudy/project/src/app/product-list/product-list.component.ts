import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {UpdateProductComponent} from"../update-product/update-product.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  constructor(private data:ProductService) { }
  products:any;
  a:number=0;
  id:number;
  name:string;
  description:string;
  price:number;
  product:any[]=[];
  editinfo:any[]=[];
  update:number=0;
  add:any={
    id:"",
    name:"",
    description:"",
    price:""

  };
  
  ngOnInit() 
  {
    return this.data.getData().subscribe(info=>{this.products=info;console.log(this.products)});
  }
  
 
  addProduct()
  {
   this.a=1;
  }

  submit(value:any)
  {
    console.log(value);
    this.product.push(this.id);
    this.product.push(this.name);
    this.product.push(this.description);
    this.product.push(this.price);
    this.a=0;
    this.add.id=this.id;
    this.add.name=this.name;
    this.add.description=this.description;
    this.add.price=this.price;
    this.products.push(this.add);
    console.log(this.products);
    alert("The product is successfully added");
    this.data.sendData(this.product).subscribe();
  }

  delData(r)
  {
    this.data.delData(r).subscribe();
  for(var a=0;a<this.products.length;a++)
  {
    if(this.products[a].id==r)
    {
      this.products.splice(a,1);
      break;
    }
  }
  
  }

sendupdData(a)
{
   this.editinfo.push(a.id);
   this.editinfo.push(a.name);
   this.editinfo.push(a.description);
   this.editinfo.push(a.price);
   this.data.receiveData(this.editinfo);
}

}

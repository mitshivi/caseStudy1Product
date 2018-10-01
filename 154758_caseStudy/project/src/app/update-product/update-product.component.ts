import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {ProductService} from '../product.service';
import{RouterModule,Router,Routes} from '@angular/router'
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Output() updateEvent=new EventEmitter<any>();
  oldId:number;
  id:number;
  name:string;
  description:string;
  price:number;
  a:any[]=[];
  
  constructor(private getdata:ProductService,private route:Router) { }

  ngOnInit() 
  {
  this.a=[];
  this.a=this.getdata.sendDataForUpdate();
  console.log("i m " + this.a);
  this.oldId=this.a[0];
  this.id=this.a[0];
  this.name=this.a[1];
  this.description=this.a[2];
  this.price=this.a[3]
}

update()
{
  this.a=[];
  this.a.push(this.id);
  this.a.push(this.name);
  this.a.push(this.description);
  this.a.push(this.price);
  this.a.push(this.oldId);
  console.log("i am the data to be sent "+this.a,this.oldId);
  this.getdata.receiveDataForUpdate(this.a,this.oldId).subscribe(data=>{this.route.navigate(["/product-list"])});
}

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  
  //getting data from the server
  information:any;
  getData()
  {
    return this.http.get("http://localhost:1234/productshow");
  }

  sendData(data){
    return this.http.post("http://localhost:1234/productsend",{"id":data[0],"name":data[1],"description":data[2],"price":data[3]});
  }

  delData(data){
    alert(data);
    return this.http.post("http://localhost:1234/deletedata",{"id":data});
  }

  receiveData(data)
  {
    alert(data);
    this.information=data;
    console.log("hello"+this.information);
  }
  
 sendDataForUpdate()
 {
 return this.information;
 }

 receiveDataForUpdate(data,oldid)
 {
   console.log(data,oldid);
   return this.http.post("http://localhost:1234/updatedata",[{"id":data[0],"name":data[1],"description":data[2],"price":data[3]},{"id":oldid}])
 }

}

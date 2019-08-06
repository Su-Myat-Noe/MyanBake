import { Product } from './../services/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CartService, BaseCartItem} from 'ng-shopping-cart';
import { Component, OnInit ,ViewEncapsulation,Input,Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  productdetail: Product;
  qty:any;
  carts:any;
  id:any;
  quant:any[];  
  amount:number=0;
  cgst:number=0;
  sgst:number=0;
  bill:number=0;
  @Input()private percent:number;
  @Output()grandtotal=new EventEmitter();
// index:any;
  constructor(
    private rest: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService<BaseCartItem>
    )
  {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);      
    });
    // this.qty = 1;
    this.getCart();  
    // this.increaseQty();
    let arr:any[] =new Array(this.carts.length).fill(0);
    this.quant=arr;
  }  
  ngOnInit() {
  }

   minus(i){
    if(this.quant[i]==0){
       alert("you can't select less than zero")
       this.quant[i]=0;
      }
    else{
      for(let v=0;v<=10;v++){
      if( this.quant[i]==v){
      this.quant[i]=--v;
      } 
      }
    }  
  }
   plus(i){
    if(this.quant[i]==10){
        alert("you can't select more than 10")
        this.quant[i]=10;       
       }
        else{
     for(let v=0;v<=10;v++){
     if( this.quant[i]==v){
     this.quant[i]=++v;
     } 
     }
     }      
   }
    remove(){
      this.carts=this.cartService.onItemRemoved;
    }     
  // decrementQty(id:any) 
  // {
  //   if(this.qty-1 < 1 )
  //     {
  //     this.qty = 1
  //     console.log('1->'+this.qty);
  //     }
  //   else
  //     {
  //     this.qty -= 1;
  //     console.log('2->'+this.qty);
  //     }
  // } 
  // increaseQty(){
  //   this.carts=this.cartService.onItemAdded;
  // }
  getCart(){
    this.carts = this.cartService.getItems();
    console.log(this.carts);
  }
  // removeItem(index:any) 
  // {
  //         this.carts=this.cartService.removeItem(index);
  // }


  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
        // isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["../assets/js/electro.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

}

// ----------------------------------Total Amount--------------------------------------------
  // getTotalAmount(): Observable<number> {
  //   return this.itemsInCartSubject.map((items: Product[]) => {
  //     return items.reduce((prev, curr: Product) => {
  //       return prev + curr.price;
  //     }, 0);
  //   });
  // }
// ----------------------------------Total Amount--------------------------------------------
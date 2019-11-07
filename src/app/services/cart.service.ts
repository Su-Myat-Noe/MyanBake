import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    changedCartService$: Subject<boolean> = new Subject<boolean>();
    discount: number = 0;

    setDiscout(amount: number) {
        this.discount = amount;
    }

    getDiscount() {
        return this.discount;
    }
}

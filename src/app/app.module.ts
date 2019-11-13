import { State } from './services/model/state';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { homeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CompareComponent } from './compare/compare.component';
import { FaqComponent } from './faq/faq.component';
import { StoredirectoryComponent } from './storedirectory/storedirectory.component';
import { TermsComponent } from './terms/terms.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShopComponent } from './shop/shop.component';
import { SuperDealComponent } from './super-deal/super-deal.component';
import { FeatureBrandsComponent } from './feature-brands/feature-brands.component';
import { TreadingComponent } from './treading/treading.component';
import { FreeShippingComponent } from './free-shipping/free-shipping.component';
import { HomeHeaderComponent } from './header/home-header/home-header.component';
import { StyleHeaderComponent } from './header/style-header/style-header.component';
import { BrandHeaderComponent } from './header/brand-header/brand-header.component';
import { TrainingComponent } from './training/training.component';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { RestApiService } from './services/rest-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ShippingComponent } from './shipping/shipping.component';

@NgModule({
    declarations: [
        AppComponent,
        homeComponent,
        HeaderComponent,
        ItemListComponent,
        ItemDetailComponent,
        CartComponent,
        CheckoutComponent,
        ConfirmComponent,
        CategoriesComponent,
        FooterComponent,
        RegisterComponent,
        ContactComponent,
        AboutComponent,
        CompareComponent,
        FaqComponent,
        StoredirectoryComponent,
        TermsComponent,
        WishlistComponent,
        ErrorPageComponent,
        ShopComponent,
        SuperDealComponent,
        FeatureBrandsComponent,
        TreadingComponent,
        FreeShippingComponent,
        HomeHeaderComponent,
        StyleHeaderComponent,
        BrandHeaderComponent,
        TrainingComponent,
        TrainingDetailComponent,
        ProductCategoryComponent,
        LoginComponent,
        ShippingComponent,
        
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ShoppingCartModule.forRoot({
            serviceType: 'localStorage',
            serviceOptions: { storageKey: 'MyanBakeAppCart', clearOnError: true }
          }),
        RouterModule.forRoot([
            {
                path: '',
                component: homeComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'training',
                component: TrainingComponent
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
            {
                path: 'compare',
                component: CompareComponent
            },
            {
                path: 'confirm',
                component: ConfirmComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'home',
                component: homeComponent
            },
            {
                path: 'itemdetail/:id',
                component: ItemDetailComponent
            },
            {
                path: 'itemlist',
                component: ItemListComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'faq',
                component: FaqComponent
            },
            {
                path: 'store',
                component: StoredirectoryComponent
            },
            {
                path: 'terms',
                component: TermsComponent
            },
            {
                path: 'wishlist/:id',
                component: WishlistComponent
            },
            {
                path: 'error',
                component: ErrorPageComponent
            },
            {
                path: 'trainingdetail',
                component: TrainingDetailComponent
            },
            {
                path: 'shop',
                component: ShopComponent
            },
            {
                path: 'deal',
                component: SuperDealComponent
            },
            {
                path: 'brand',
                component: FeatureBrandsComponent
            },
            {
                path: 'treading',
                component: TreadingComponent
            },
            {
                path: 'freeship',
                component: FreeShippingComponent
            },
            {
                path: 'productcategory/:id',
                component: ProductCategoryComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'shipping',
                component: ShippingComponent
            }

        ])
    ],
    providers: [
        RestApiService,
        Store,
        AuthService,
        State,
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

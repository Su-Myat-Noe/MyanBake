import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { BlogComponent } from './blog/blog.component';
import { registerContentQuery } from '@angular/core/src/render3';
import { FaqComponent } from './faq/faq.component';
import { StoredirectoryComponent } from './storedirectory/storedirectory.component';
import { TermsComponent } from './terms/terms.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ShopComponent } from './shop/shop.component';
import { SuperDealComponent } from './super-deal/super-deal.component';
import { FeatureBrandsComponent } from './feature-brands/feature-brands.component';
import { TreadingComponent } from './treading/treading.component';
import { FreeShippingComponent } from './free-shipping/free-shipping.component';
import { HomeHeaderComponent } from './header/home-header/home-header.component';
import { StyleHeaderComponent } from './header/style-header/style-header.component';
import { BrandHeaderComponent } from './header/brand-header/brand-header.component';


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
        BlogComponent,
        FaqComponent,
        StoredirectoryComponent,
        TermsComponent,
        WishlistComponent,
        ErrorPageComponent,
        BlogDetailComponent,
        ShopComponent,
        SuperDealComponent,
        FeatureBrandsComponent,
        TreadingComponent,
        FreeShippingComponent,
        HomeHeaderComponent,
        StyleHeaderComponent,
        BrandHeaderComponent

    ],
    imports: [
        BrowserModule,
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
                path: 'blog',
                component: BlogComponent
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
                path: 'itemdetail',
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
                path: 'wishlist',
                component: WishlistComponent
            },
            {
                path: 'error',
                component: ErrorPageComponent
            },
            {
                path: 'blogdetail',
                component: BlogDetailComponent
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
            }

        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

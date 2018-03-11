import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { loadIconSvg } from '../utils/loadiconsvg';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ServiceModule } from '../service/service.module';
import { AvatarListFormModule } from '../avatar-list-form/avatar-list-form.module';
import { EcomponentFormModule } from '../ecomponent-form/ecomponent-form.module';
import { ItemModule } from '../item/item.module';
import { ModifyAvatarComponent } from './user-fn/modify-avatar/modify-avatar.component';
import { ChangePsComponent } from './user-fn/change-ps/change-ps.component';
@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceModule,
    EcomponentFormModule,
    RouterModule,
    ItemModule,
    AvatarListFormModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent, ModifyAvatarComponent, ChangePsComponent],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
  entryComponents: [ModifyAvatarComponent, ChangePsComponent]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() private parent: CoreModule,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    if (this.parent) {
      throw new Error('核心模块已加载！不要重复加载！')
    }
    loadIconSvg(iconRegistry, sanitizer);


  }
}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * This abstract class used for module building by extending this class
 * prevents importing the module into somewhere else than root App Module.
 */
export abstract class EnsureImportedOnceModule {
    protected constructor(targetModule: NgModule) {
        if (targetModule) {
            throw new Error(`${targetModule.constructor.name} has already been loaded.`);
        }
    }
}

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: []
})
export class CoreModule extends EnsureImportedOnceModule {
    public constructor(@SkipSelf() @Optional() parent: CoreModule) {
        super(parent);
    }
}

// / <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { loadTranslations } from '@angular/localize';

// First locale is default, add additional after it
const availableLocales = ['en', 'ar', 'es', 'fr', 'zh'];
// Direct macrolanguages to specific ones
const localeMappings: { [key: string]: string } = {};

let locale = availableLocales.find(l => navigator.language.startsWith(l)) ?? availableLocales[0];
window.document.documentElement.lang = locale;
if (locale in localeMappings) {
    locale = localeMappings[locale];
}

if (locale === availableLocales[0]) {
    console.log('default locale');
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch(err => console.error(err));
} else {
    // fetch resources for runtime translations. this could also point to an API endpoint
    fetch(`assets/i18n/messages.${locale}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            return response.json();
        })
        .then(result => {
            loadTranslations(result);

            platformBrowserDynamic()
                .bootstrapModule(AppModule)
                .catch(err => console.error(err));
        });
}

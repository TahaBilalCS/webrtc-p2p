// / <reference types="@angular/localize" />
import { loadTranslations } from '@angular/localize';
import { AppComponent } from '@app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { SessionViewComponent } from '@feature/session/components/session-view/session-view.component';
import { HomeViewComponent } from '@feature/home/components/home-view/home-view.component';

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
    bootstrapApp();
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
            bootstrapApp();
        });
}

function bootstrapApp() {
    const routes: Routes = [
        {
            path: 'session/:session_id',
            component: SessionViewComponent
        },

        {
            path: '',
            component: HomeViewComponent
        },
        // {
        //     path: 'session',
        //     pathMatch: 'full',
        //     redirectTo: '/' // Redirect to app's main page or to a 404 page
        // },
        {
            path: '**',
            redirectTo: ''
        }
    ];

    bootstrapApplication(AppComponent, {
        providers: [provideRouter(routes)]
    }).catch(err => console.error(err));
}

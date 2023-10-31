import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum AppTheme {
    LIGHT = 'lara-light',
    DARK = 'lara-dark'
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private renderer: Renderer2;
    private readonly themeKey = 'user-theme';
    private readonly themeLinkId = '#app-theme';
    private readonly expectedDefaultTheme = AppTheme.DARK;
    private themeSubject: BehaviorSubject<AppTheme | null> = new BehaviorSubject<AppTheme | null>(null);

    public get currentTheme(): Observable<AppTheme | null> {
        return this.themeSubject.asObservable();
    }

    /**
     * NOTE: The default theme is set on the <link> tag in index.html
     *
     * Services shouldn't really manipulate the DOM. Things will break in certain contexts like SSR.
     * In this service, you should only use Renderer2 to manipulate the DOM.
     * You can't inject Renderer2 directly into services, but you can create one using RendererFactory2
     */
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public initializeTheme() {
        const localStorageTheme = this.getLocalStorageTheme();
        if (this.isValidTheme(localStorageTheme)) {
            const themeLink = this.renderer.selectRootElement(this.themeLinkId) as HTMLLinkElement;

            // Check if theme matches already set theme
            const currentActualTheme = this.parseIndexHTMLLink(themeLink);
            if (currentActualTheme && currentActualTheme === localStorageTheme) {
                this.themeSubject.next(localStorageTheme);
                return;
            }

            this.handleThemeChange(localStorageTheme, themeLink);
        } else {
            console.warn('ThemeService: invalid theme from local storage, using default');
            // Emit the default theme we expect from index.html
            this.themeSubject.next(this.expectedDefaultTheme);
        }
    }

    public setTheme(theme: AppTheme | null) {
        if (!theme) {
            console.warn('ThemeService: null theme');
            return;
        }

        if (!this.isValidTheme(theme)) {
            console.warn('ThemeService: theme invalid');
            return;
        }

        const themeLink = this.renderer.selectRootElement(this.themeLinkId) as HTMLLinkElement;

        // Check if theme matches already set theme
        const currentActualTheme = this.parseIndexHTMLLink(themeLink);
        if (currentActualTheme && currentActualTheme === theme) {
            console.warn('ThemeService: theme already set');
            return;
        }

        this.handleThemeChange(theme, themeLink);
    }

    public toggleTheme() {
        const themeLink = this.renderer.selectRootElement(this.themeLinkId) as HTMLLinkElement;
        const currentAppTheme = this.parseIndexHTMLLink(themeLink);
        switch (currentAppTheme) {
            case AppTheme.LIGHT:
                this.handleThemeChange(AppTheme.DARK, themeLink);
                break;
            case AppTheme.DARK:
                this.handleThemeChange(AppTheme.LIGHT, themeLink);
                break;
            default:
                console.warn('ThemeService: Not a toggleable theme');
                break;
        }
    }

    private handleThemeChange(theme: AppTheme, themeLink?: HTMLLinkElement) {
        // Change css file in index.html
        this.renderer.setAttribute(themeLink, 'href', theme + '.css');
        // Set new theme in local storage
        this.saveLocalStorageTheme(theme);
        // Emit new value
        this.themeSubject.next(theme);
    }

    private saveLocalStorageTheme(theme: AppTheme) {
        localStorage.setItem(this.themeKey, theme);
    }

    private getLocalStorageTheme(): string | null {
        return localStorage.getItem(this.themeKey);
    }

    private isValidTheme(theme: string | null): theme is AppTheme {
        return Object.values(AppTheme).includes(theme as AppTheme);
    }

    private parseIndexHTMLLink(themeLink: HTMLLinkElement): AppTheme | null {
        const hrefValue = themeLink.getAttribute('href');
        if (!hrefValue) return null;

        const htmlAppTheme = hrefValue.replace('.css', '');

        return htmlAppTheme as AppTheme;
    }
}

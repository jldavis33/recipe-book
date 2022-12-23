// NOTE! - This is a custom directive to use with Bootstrap.
// There is a library that includes the full functionality of the dropdown as is provided with `Popper.js`.
import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    private isOpen = false;
    private dropdownToggle?: HTMLButtonElement;
    private dropdownMenu?: HTMLUListElement;
    private styleDefinition: {[index: string]:any} = {position: 'absolute', inset: '0 auto auto 0', margin: '0', transform: 'translate3d(0, 40px, 0)'}

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.dropdownToggle = this.elRef.nativeElement;
        this.dropdownMenu = this.elRef.nativeElement.nextElementSibling as HTMLUListElement;
    }

    /**
     * When the host is "clicked", toggle the "show" class on the host `<button>` and sibling, `<ul>`.
     * Also toggle the necessary _styling_ for the `<ul>`.
     */
    @HostListener('click') toggleOpen() {
        if (!this.isOpen) {
            this.renderer.addClass(this.dropdownToggle, 'show');
            this.renderer.addClass(this.dropdownMenu, 'show');

            for (let attr in this.styleDefinition) {
                this.renderer.setStyle(this.dropdownMenu, attr, this.styleDefinition[attr]);
            }
        } else {
            this.renderer.removeClass(this.dropdownToggle, 'show');
            this.renderer.removeClass(this.dropdownMenu, 'show');
            this.renderer.removeAttribute(this.dropdownMenu, 'style')
        }
        this.isOpen = !this.isOpen;
    }
}




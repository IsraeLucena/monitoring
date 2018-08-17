import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-el-checkbox',
    templateUrl: './el-checkbox.component.html',
    styleUrls: ['./el-checkbox.component.scss']
})
export class ElCheckboxComponent implements OnInit {

    _val: any = '';
    _checked = true;

    @Output()
    valChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('size')
    set size(value: any) {
        if (value === 'lg') {
            this._val = 'el-switch-lg';
        } else if (value === 'sm') {
            this._val = 'el-switch-sm';
        } else {
            this._val = '';
        }
    }

    @Input('val')
    set checked(value: any) {
        // console.log('set ', value);
        this._checked = value;
    }

    get checked() {
        // console.log('get ', this._checked);
        return this._checked;
    }

    alterar() {
        this.valChange.emit(this._checked);
    }



    constructor() { }

    ngOnInit(): void { }
}

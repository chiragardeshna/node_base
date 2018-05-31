import 'mocha';
import {expect} from 'chai';

import Radio from "../../../../../src/vendor/Nterprise/View/Form/Fields/Radio";

describe('new Radio().output()', () => {
    it('should throw if name not provided.', () => {
        expect(() => {
            new Radio().setLabel('User Name').setValue('ardeshnachirag@gmail.com').output();
        }).to.throw("Name can not be empty.");
    })
});

describe('new Radio().output()', () => {
    it('should render radio field.', () => {
        let radioField = new Radio()
            .setOption('male')
            .setName('gender')
            .setLabel('Male');

        let expectedField = `input#gender_male.with-gap.radio-col-teal(type="radio" name="gender" value="male"  )
        label.form-label(for="gender_male") Male`;

        expect(radioField.output()).to.equal(expectedField);
    })
});

describe('new Radio().output()', () => {
    it('should render radio field checked.', () => {
        let radioField = new Radio()
            .setOption('male')
            .setName('gender')
            .setLabel('Male')
            .setValue('male')
        ;

        let expectedField = `input#gender_male.with-gap.radio-col-teal(type="radio" name="gender" value="male" checked="checked" )
        label.form-label(for="gender_male") Male`;

        expect(radioField.output()).to.equal(expectedField);
    })
});

describe('new Radio().output()', () => {
    it('should render checkbox field with attributes.', () => {
        let radioField = new Radio()
            .setOption('male')
            .setName('gender')
            .setLabel('Male')
            .setAttributes({style: "margin:100px", disabled: true, id: "username", className: "form-control test2"});

        let expectedField = `input#username.form-control.test2(type="radio" name="gender" value="male"  style="margin:100px" disabled="true" )
        label.form-label(for="username") Male`;

        expect(radioField.output()).to.equal(expectedField);
    })
});
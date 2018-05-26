import 'mocha';
import {expect} from 'chai';

import Radio from "../../../../src/vendor/Nterprise/View/Form/Fields/Radio";

describe('new Radio().render()', () => {
    it('should throw if name not provided.', () => {
        expect(() => {
            new Radio().setLabel('User Name').setValue('ardeshnachirag@gmail.com').render();
        }).to.throw("Name can not be empty.");
    })
});

describe('new Radio().render()', () => {
    it('should render radio field.', () => {
        let radioField = new Radio()
            .setName('gender')
            .setOption('male')
            .setLabel('Male');

        let expectedField = `input#gender_male.with-gap.radio-col-teal(type="radio" name="gender" value="male"  )
        label.form-label(for="gender_male") Male`;

        expect(radioField.render()).to.equal(expectedField);
    })
});

describe('new Radio().render()', () => {
    it('should render radio field checked.', () => {
        let radioField = new Radio()
            .setName('gender')
            .setOption('male')
            .setLabel('Male')
            .setValue('male')
        ;

        let expectedField = `input#gender_male.with-gap.radio-col-teal(type="radio" name="gender" value="male" checked="checked" )
        label.form-label(for="gender_male") Male`;

        expect(radioField.render()).to.equal(expectedField);
    })
});

describe('new Radio().render()', () => {
    it('should render checkbox field with attributes.', () => {
        let radioField = new Radio()
            .setName('gender')
            .setOption('male')
            .setLabel('Male')
            .setAttributes({style: "margin:100px", disabled: true, id: "username", className: "form-control test2"});

        let expectedField = `input#username.form-control.test2(type="radio" name="gender" value="male"  style="margin:100px" disabled="true" )
        label.form-label(for="username") Male`;

        expect(radioField.render()).to.equal(expectedField);
    })
});

/*
 describe('new Radio().render()', () => {
 it('should have error class if error specified.', () => {
 let Radio = new Radio()
 .setName('username')
 .setLabel('User Name')
 .setError({className: "error focused"})
 .setValue('ardeshnachirag@gmail.com');

 let expectedField = `.form-group.form-float
 .form-line.error.focused
 input#username.form-control(type="text" name="username" value="ardeshnachirag@gmail.com" )
 label.form-label User Name`;

 expect(Radio.render()).to.equal(expectedField);
 })
 });

 describe('new Radio().render()', () => {
 it('should render text field with attributes.', () => {
 let Radio = new Radio()
 .setName('username')
 .setLabel('User Name')
 .setValue('ardeshnachirag@gmail.com')
 .setAttributes({style: "margin:100px", disabled: true, id: "username", className: "form-control test2"});

 let expectedField = `.form-group.form-float
 .form-line
 input#username.form-control.test2(type="text" name="username" value="ardeshnachirag@gmail.com" style="margin:100px" disabled="true" )
 label.form-label User Name`;

 expect(Radio.render()).to.equal(expectedField);
 })
 });

 describe('new Radio().setName()', () => {
 it('should throw if string not given as param.', () => {
 expect(() => {
 new Radio().setName({name: 'Name'});
 }).to.throw("Name must be string.");
 })
 });

 describe('new Radio().setValue()', () => {
 it('should throw if string not given as param.', () => {
 expect(() => {
 new Radio().setValue({name: 'Name'});
 }).to.throw("Value must be string.");
 })
 });

 describe('new Radio().setAttributes()', () => {
 it('should throw if object not given as param.', () => {
 expect(() => {
 new Radio().setAttributes("string");
 }).to.throw("Attributes must be object.");
 })
 });*/

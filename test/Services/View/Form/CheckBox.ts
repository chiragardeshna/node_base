import 'mocha';
import {expect} from 'chai';

import CheckBox from "../../../../src/vendor/Nterprise/View/Form/Fields/CheckBox";

describe('new CheckBox().render()', () => {
    it('should throw if name not provided.', () => {
        expect(() => {
            new CheckBox().setLabel('User Name').setValue('ardeshnachirag@gmail.com').render();
        }).to.throw("Name can not be empty.");
    })
});

describe('new CheckBox().render()', () => {
    it('should render checkbox.', () => {
        let checkbox = new CheckBox()
            .setName('gender')
            .setOption('male')
            .setLabel('Male');

        let expectedField = `input#gender_male.with-gap.radio-col-teal(type="checkbox" name="gender" value="male"  )
        label.form-label(for="gender_male") Male`;

        expect(checkbox.render()).to.equal(expectedField);
    })
});

describe('new CheckBox().render()', () => {
    it('should render radio field checked.', () => {
        let checkbox = new CheckBox()
            .setName('gender')
            .setOption('male')
            .setLabel('Male')
            .setValue('male')
        ;

        let expectedField = `input#gender_male.with-gap.radio-col-teal(type="checkbox" name="gender" value="male" checked="checked" )
        label.form-label(for="gender_male") Male`;

        expect(checkbox.render()).to.equal(expectedField);
    })
});

describe('new CheckBox().render()', () => {
    it('should render checkbox field with attributes.', () => {
        let checkbox = new CheckBox()
            .setName('gender')
            .setOption('male')
            .setLabel('Male')
            .setAttributes({style: "margin:100px", disabled: true, id: "username", className: "form-control test2"});

        let expectedField = `input#username.form-control.test2(type="checkbox" name="gender" value="male"  style="margin:100px" disabled="true" )
        label.form-label(for="username") Male`;

        expect(checkbox.render()).to.equal(expectedField);
    })
});

/*
 describe('new CheckBox().render()', () => {
 it('should have error class if error specified.', () => {
 let CheckBox = new CheckBox()
 .setName('username')
 .setLabel('User Name')
 .setError({className: "error focused"})
 .setValue('ardeshnachirag@gmail.com');

 let expectedField = `.form-group.form-float
 .form-line.error.focused
 input#username.form-control(type="text" name="username" value="ardeshnachirag@gmail.com" )
 label.form-label User Name`;

 expect(CheckBox.render()).to.equal(expectedField);
 })
 });

 describe('new CheckBox().setName()', () => {
 it('should throw if string not given as param.', () => {
 expect(() => {
 new CheckBox().setName({name: 'Name'});
 }).to.throw("Name must be string.");
 })
 });

 describe('new CheckBox().setValue()', () => {
 it('should throw if string not given as param.', () => {
 expect(() => {
 new CheckBox().setValue({name: 'Name'});
 }).to.throw("Value must be string.");
 })
 });

 describe('new CheckBox().setAttributes()', () => {
 it('should throw if object not given as param.', () => {
 expect(() => {
 new CheckBox().setAttributes("string");
 }).to.throw("Attributes must be object.");
 })
 });*/

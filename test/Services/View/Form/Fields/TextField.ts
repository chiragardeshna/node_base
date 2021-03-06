import 'mocha';
import {expect} from 'chai';

import TextField from "../../../../../src/vendor/Nterprise/View/Form/Fields/TextField";

import Template from "../../../../../src/vendor/Nterprise/View/Form/Fields/Template";
import {PUG_SPACE} from "../../../../../src/vendor/Nterprise/View/Constants"

let template = new Template(`.form-group.form-float
${PUG_SPACE}.form-line{{errorClass}}
${PUG_SPACE.repeat(2)}{{field}}`);

describe('new TextField().output()', () => {
    it('should throw if name not provided.', () => {
        expect(() => {
            new TextField().setLabel('User Name').setValue('ardeshnachirag@gmail.com').output();
        }).to.throw("Name can not be empty.");
    })
});

describe('new TextField().output()', () => {
    it('should render text field.', () => {
        let textField = new TextField()
            .setName('username')
            .setLabel('User Name')
            .setValue('ardeshnachirag@gmail.com');

        let expectedField = `.form-group.form-float
    .form-line
        input#username.form-control(type="text" name="username" value="ardeshnachirag@gmail.com" )
        label.form-label User Name`;

        expect(template.render(textField)).to.equal(expectedField);
    })
});

describe('new TextField().output()', () => {
    it('should have error class if error specified.', () => {
        let textField = new TextField()
            .setName('username')
            .setLabel('User Name')
            .setError({'class': "error focused"})
            .setValue('ardeshnachirag@gmail.com');

        let expectedField = `.form-group.form-float
    .form-line.error.focused
        input#username.form-control(type="text" name="username" value="ardeshnachirag@gmail.com" )
        label.form-label User Name`;

        expect(template.render(textField)).to.equal(expectedField);
    })
});

describe('new TextField().output()', () => {
    it('should render text field with attributes.', () => {
        let textField = new TextField()
            .setName('username')
            .setLabel('User Name')
            .setValue('ardeshnachirag@gmail.com')
            .setAttributes({style: "margin:100px", disabled: true, id: "username", 'class': "form-control test2"});

        let expectedField = `.form-group.form-float
    .form-line
        input#username.form-control.test2(type="text" name="username" value="ardeshnachirag@gmail.com" style="margin:100px" disabled="true" )
        label.form-label User Name`;

        expect(template.render(textField)).to.equal(expectedField);
    })
});

describe('new TextField().setName()', () => {
    it('should throw if string not given as param.', () => {
        expect(() => {
            new TextField().setName({name: 'Name'});
        }).to.throw("Name must be string.");
    })
});

describe('new TextField().setValue()', () => {
    it('should throw if string not given as param.', () => {
        expect(() => {
            new TextField().setValue({name: 'Name'});
        }).to.throw("Value must be string.");
    })
});

describe('new TextField().setAttributes()', () => {
    it('should throw if object not given as param.', () => {
        expect(() => {
            new TextField().setAttributes("string");
        }).to.throw("Attributes must be object.");
    })
});
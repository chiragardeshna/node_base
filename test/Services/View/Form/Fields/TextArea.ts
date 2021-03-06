import 'mocha';
import {expect} from 'chai';

import TextArea from "../../../../../src/vendor/Nterprise/View/Form/Fields/TextArea";
import Template from "../../../../../src/vendor/Nterprise/View/Form/Fields/Template";
import {PUG_SPACE} from "../../../../../src/vendor/Nterprise/View/Constants"

let template = new Template(`.form-group.form-float
${PUG_SPACE}.form-line{{errorClass}}
${PUG_SPACE.repeat(2)}{{field}}`);

describe('new TextArea().output()', () => {
    it('should throw if name not provided.', () => {
        expect(() => {
            new TextArea().setLabel('User Name').setValue('ardeshnachirag@gmail.com').output();
        }).to.throw("Name can not be empty.");
    })
});

describe('new TextArea().output()', () => {
    it('should render text field.', () => {
        let areaField = new TextArea()
            .setName('description')
            .setValue('Description goes here...')
            .setAttributes({placeholder: "Here goes description..."})
        ;

        let expectedField = `.form-group.form-float
    .form-line
        textarea#description.form-control(name="description" placeholder="Here goes description..." ) Description goes here...`;

        console.log(template.render(areaField));

        expect(template.render(areaField)).to.equal(expectedField);
    })
});

describe('new TextArea().output()', () => {
    it('should have error class if error specified.', () => {
        let areaField = new TextArea()
            .setName('description')
            .setValue('Description goes here...')
            .setError({'class': "error focused"});

        let expectedField = `.form-group.form-float
    .form-line.error.focused
        textarea#description.form-control(name="description" ) Description goes here...`;

        expect(template.render(areaField)).to.equal(expectedField);
    })
});

describe('new TextArea().output()', () => {
    it('should render text field with attributes.', () => {
        let areaField = new TextArea()
            .setName('description')
            .setValue('Description goes here...')
            .setAttributes({
                style: "margin:100px",
                disabled: true,
                id: "desc",
                'class': "form-control test2",
                rows: "10",
                cols: "10"
            });

        let expectedField = `.form-group.form-float
    .form-line
        textarea#desc.form-control.test2(name="description" style="margin:100px" disabled="true" rows="10" cols="10" ) Description goes here...`;

        expect(template.render(areaField)).to.equal(expectedField);
    })
});

describe('new TextArea().setName()', () => {
    it('should throw if string not given as param.', () => {
        expect(() => {
            new TextArea().setName({name: 'Name'});
        }).to.throw("Name must be string.");
    })
});

describe('new TextArea().setValue()', () => {
    it('should throw if string not given as param.', () => {
        expect(() => {
            new TextArea().setValue({name: 'Name'});
        }).to.throw("Value must be string.");
    })
});

describe('new TextArea().setAttributes()', () => {
    it('should throw if object not given as param.', () => {
        expect(() => {
            new TextArea().setAttributes("string");
        }).to.throw("Attributes must be object.");
    })
});
import 'mocha';
import {expect} from 'chai';
import {isEqual} from "lodash";

import SelectField from "../../../../src/vendor/Nterprise/View/Form/Fields/SelectField";

describe('new SelectField().render()', () => {
    it('should render select field.', () => {
        let selectField = new SelectField()
            .setName('role')
            .setOptions([
                {label: "Admin", value: "admin"},
                {label: "Editor", value: "editor"},
                {label: "User", value: "user"},
            ])
            .setValue('user')
        ;

        let expectedField = `.form-group.form-float
    .form-line
        select#role.form-control(name="role" )
            option(value="admin") Admin
            option(value="editor") Editor
            option(value="user" selected="selected") User`;

        console.log(selectField.render());

        expect(selectField.render()).to.equal(expectedField);
    })
});

describe('new SelectField().render()', () => {
    it('should render multi select field.', () => {
        let selectField = new SelectField()
            .setName('role')
            .setOptions([
                {label: "Admin", value: "admin"},
                {label: "Editor", value: "editor"},
                {label: "User", value: "user"},
            ])
            .setAttributes({multiple: true})
            .setValue(['user', 'admin']);

        let expectedField = `.form-group.form-float
    .form-line
        select#role.form-control(name="role" multiple="true" )
            option(value="admin" selected="selected") Admin
            option(value="editor") Editor
            option(value="user" selected="selected") User`;

        console.log(selectField.render());

        expect(selectField.render()).to.equal(expectedField);
    })
});

describe('new SelectField().render()', () => {
    it('should have error class if error specified.', () => {
        let selectField = new SelectField()
            .setName('role')
            .setError({className: "error focused"})
            .setOptions([
                {label: "Admin", value: "admin"},
                {label: "Editor", value: "editor"},
                {label: "User", value: "user"},
            ])
            .setValue('user');

        let expectedField = `.form-group.form-float
    .form-line.error.focused
        select#role.form-control(name="role" )
            option(value="admin") Admin
            option(value="editor") Editor
            option(value="user" selected="selected") User`;

        expect(selectField.render()).to.equal(expectedField);
    })
});

describe('new SelectField().render()', () => {
    it('should render select field with attributes.', () => {
        let selectField = new SelectField()
            .setName('role')
            .setError({className: "error focused"})
            .setAttributes({style: "margin: 0px", className: "testClass testClass2", id: "id"})
            .setOptions([
                {label: "Admin", value: "admin"},
                {label: "Editor", value: "editor"},
                {label: "User", value: "user"},
            ])
            .setValue('user');

        let expectedField = `.form-group.form-float
    .form-line.error.focused
        select#id.testClass.testClass2(name="role" style="margin: 0px" )
            option(value="admin") Admin
            option(value="editor") Editor
            option(value="user" selected="selected") User`;

        expect(selectField.render()).to.equal(expectedField);
    })
});

describe('new SelectField().render()', () => {
    it('should throw if option specified is not array. ', () => {
        let throwable = () => {
            new SelectField()
                .setName('role')
                .setError({className: "error focused"})
                .setOptions("invalid options")
                .setValue('user')
                .render()
        };

        expect(throwable).to.throw("Options must be array of name value pair.");
    })
});

describe('new SelectField().render()', () => {
    it('should throw if name not specified. ', () => {
        let throwable = () => {
            new SelectField()
                .setError({className: "error focused"})
                .setOptions([])
                .render()
        };

        expect(throwable).to.throw("Name can not be empty.");
    })
});

describe('new SelectField().optionList()', () => {
    it('should give options list. ', () => {

        let options = [
            {label: "Admin", value: "admin"},
            {label: "Editor", value: "editor"},
            {label: "User", value: "user"},
        ];

        let expectedOptionsList = [
            'option(value="admin") Admin',
            'option(value="editor") Editor',
            'option(value="user") User'
        ];

        expect(isEqual(new SelectField().optionList(options, ''), expectedOptionsList)).to.equal(true);
    })
});

describe('new SelectField().optionList()', () => {
    it('should give options list with selected option. ', () => {

        let options = [
            {label: "Admin", value: "admin"},
            {label: "Editor", value: "editor"},
            {label: "User", value: "user"},
        ];

        let values = "user";

        let expectedOptionsList = [
            'option(value="admin") Admin',
            'option(value="editor") Editor',
            'option(value="user" selected="selected") User'
        ];

        expect(isEqual(new SelectField().optionList(options, values), expectedOptionsList)).to.equal(true);
    })
});

describe('new SelectField().optionList()', () => {
    it('should give options list with multiple selected option. ', () => {

        let options = [
            {label: "Admin", value: "admin"},
            {label: "Editor", value: "editor"},
            {label: "User", value: "user"},
        ];

        let values = ["user", "admin"];

        let expectedOptionsList = [
            'option(value="admin" selected="selected") Admin',
            'option(value="editor") Editor',
            'option(value="user" selected="selected") User'
        ];

        expect(isEqual(new SelectField().optionList(options, values), expectedOptionsList)).to.equal(true);
    })
});
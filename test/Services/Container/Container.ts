import Container from "../../../src/app/Services/Container/Container";
import TestObject from "./TestObject";

import 'mocha';
import {expect} from 'chai';

let container = new Container();

describe('new Container().register()', () => {
    it('should register factory function.', () => {

        container.register("testObject", () => {
            let name = Math.random();
            return new TestObject(name);
        });

        let testObject = container.make("testObject");

        let testObject2 = container.make("testObject");        

        console.log(testObject, testObject2);

        expect(testObject.name !== testObject2.name).to.equal(false);
    });
});

describe('new Container().register()', () => {
    it('should register singleton object.', () => {

        container.register("testObject", () => {
            let name = Math.random();
            return new TestObject(name);
        }, "singleton");

        let testObject = container.make("testObject");

        let testObject2 = container.make("testObject");

        console.log(testObject, testObject2);

        expect(testObject.name === testObject2.name).to.equal(true);
    });
});
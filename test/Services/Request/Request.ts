import 'mocha';
import {expect} from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock'
import Request from "../../../src/app/Services/Request/Request";

/*
describe('Request.registerProxy()', () => {
    it('should allow to extend Request Object', () => {
        const request = {
            method: "POST",
            body: {
                foo: 'bar',
            }
        };
        const req = mockReq(request);

        let requestObj = new Request(req);
        console.log(requestObj.get("test"));
    })
});*/

describe('Request.registerProxy()', () => {
    it('should allow to extend Request Object', () => {
        const request = {
            method: "POST",
            body: {
                foo: 'bar',
            }
        };
        const req = mockReq(request);

        let requestObj = new Request(req);

        requestObj.constructor

        console.log(req);

        console.log(req.fullUrl());
    })
});
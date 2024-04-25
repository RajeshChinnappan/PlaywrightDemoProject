import { test, expect } from '@playwright/test';
const endpoints = JSON.parse(JSON.stringify(require("../testdata/endpoints.json")));

export class ApiClient {

    readonly request : any;

    constructor(request: any) {
        this.request = request;
    }

    async makeRequest({ baseUrl = endpoints.baseURL, endPoint = '', data = '', responseStatus = '' }: {
        baseUrl?: string,
        endPoint?: string,
        data?: any, 
        responseStatus?: string
    }): Promise<any> { 
        let response: any;
        const url = `${baseUrl}${endPoint}`;
        console.log("URL" + " " + url);
        for (const key in data) {
            const payload = data[key];
            console.log(payload);
            response = await this.request.post(url, {
                data: payload,
                headers: { "Accept": "application/json" }
            });
            expect(response.status()).toBe(responseStatus);
        }
        return response;
    }
}









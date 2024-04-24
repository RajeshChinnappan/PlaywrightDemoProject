const { test, expect } = require("@playwright/test");
const { ApiClient } = require("../api-client/ApiClient");
const payloads = JSON.parse(JSON.stringify(require("../testdata/payloads.json")));
const endpoints = JSON.parse(JSON.stringify(require("../testdata/endpoints.json")));

let createSamsungGalaxyS6Payload;
let createNokiaLumina1520Payload;
let deleteSamsungGalaxyS6Payload;
let deleteNokiaLumina1520Payload;
let apiClinet;

test.describe.configure({ mode: 'serial' })

test.beforeAll(() => {
    createSamsungGalaxyS6Payload = payloads.addToCartSamsungGalaxyS6Payload;
    createNokiaLumina1520Payload = payloads.addToCartNokiaLumina1520Payload;
    deleteSamsungGalaxyS6Payload = payloads.deleteSamsungGalaxyS6PayloadFromAddToCart;
    deleteNokiaLumina1520Payload = payloads.deleteToCartNokiaLumina1520Payload;
});

test("Verify user is able to add products to carts", async ({ request }) => {
     apiClinet = new ApiClient(request);
    await apiClinet.makeRequest({ endPoint: endpoints.addToCart, data: { createSamsungGalaxyS6Payload, createNokiaLumina1520Payload }, responseStatus: 200 });
});

test("Verify user is able to delete products from cart", async ({ request }) => {
     apiClinet = new ApiClient(request);
    await apiClinet.makeRequest({ endPoint: endpoints.addToCart, data: { deleteSamsungGalaxyS6Payload, deleteNokiaLumina1520Payload }, responseStatus: 200 });
});




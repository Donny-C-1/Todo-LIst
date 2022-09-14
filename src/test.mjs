import { createItem, storeItem } from "./db.js";

function test() {
    const item = createItem('Ride a bike everyday');
    storeItem(item);
}
test();
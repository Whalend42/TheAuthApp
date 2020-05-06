import { Client } from "./../Client.ts";
import { ConParam } from "./../ConParam.ts";

test("ConParam is instantiated", () => {
  //import { Client } from "./../Client.ts";
  //import { ConParam } from "./../ConParam.ts";

  const conParam = new ConParam('', '');
  expect(1+1).toBe(2);
});

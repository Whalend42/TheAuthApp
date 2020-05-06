import { Client } from "./../Client";
import { ConParam } from "./../ConParam";
import { IpAddr } from "../../common/valueobjects/IpAddr";
import { Port } from "../../common/valueobjects/Port";

test("check IpAddr type assertion", () => {
  const ip = new IpAddr("1.1.1.1");
  expect(ip.value).toBe("1.1.1.1");
  expect(() => {
    new IpAddr("1.1.1.a");
  }).toThrow();
});

test("check Port type assertion", () => {
  const port = new Port(12345);
  expect(port.value).toBe(12345);
  expect(() => {
    new Port(0);
  }).toThrow();
});

test("ConParam can be instantiated correctly", () => {
  const ip = new IpAddr("127.0.0.1");
  const port = new Port(12345);
  const conParam = new ConParam(ip, port);
  expect(conParam.host.value).toBe("127.0.0.1");
  expect(conParam.port.value).toBe(12345);
});

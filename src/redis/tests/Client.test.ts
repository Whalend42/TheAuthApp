import { Client } from "redis/Client";
import { ConParam } from "redis/ConParam";
import { ConfigTypes } from "redis/ConParamInterface";
import { IpAddr } from "common/valueobjects/IpAddr";
import { Port } from "common/valueobjects/Port";

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

test("ConParam can be instantiated with port and ip", () => {
  const ip = new IpAddr("127.0.0.1");
  const port = new Port(6379);
  const conParam = new ConParam(ip, port);
  expect(conParam.host.value).toBe("127.0.0.1");
  expect(conParam.port.value).toBe(6379);
  expect(conParam.configType).toBe(ConfigTypes.ip_and_port);
});

test("ConParam can be instantiated url", () => {
  const url = 'some://url:port';
  const conParam = new ConParam(url);
  expect(conParam.host).toBe(IpAddr.Null);
  expect(conParam.port).toBe(Port.Null);
  expect(conParam.url).toBe(url);
  expect(conParam.configType).toBe(ConfigTypes.url);
});

test("Valid connection client work", async () => {
  jest.setTimeout(1000 * 10);
  const conParam = new ConParam("redis://redis:6379");
  const client = new Client(conParam);
  await client.connect();
  await client.setStr("foo","bar");
  const result = await client.getStr("foo");
  expect(result).toBe("bar");
  await client.quit();
});

test("Invalid connection client fail", async () => {
  jest.setTimeout(1000 * 10);
  const conParam = new ConParam("redis://bar:2222");
  const client = new Client(conParam);
  expect(async () => {
    await client.connect();
  }).toThrow();
});

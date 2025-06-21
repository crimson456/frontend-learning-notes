# Jest Learning



## 配置文件

可以通过 jest --init 在根目录下生成jest.config.js配置文件

配置项：


- coverageDirectory 代码覆盖率报告文件目录


## 异步函数测试的几种形式

异步测试时的问题：同步代码执行完毕时测试就结束了，此时异步代码还未执行结束
解决方法：使用异步函数async、放入返回值、添加done函数使测试延迟结束

1. 测试promise对象时,将promise对象放在return或await后
```js
test('xxx', () => {
  return fetchData().then(res => {
    expect(res).toBe('xxx');
  });
});

test('xxx', async () => {
  const res = await fetchData();
  expect(xxx).toBe('xxx');
});
```
2. 测试promise对象时,使用expect函数的.resolves和.rejects方法,注意此处也需要放在return后
```js
test('xxx', () => {
  return expect(fetchData()).resolves.toBe('xxx');
});
```
3. 回调，使用done函数
```js
test('xxx', done => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('xxx');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```



## 注意项




## 全局导出方法


afterAll(fn, timeout) 测试过程的钩子函数
afterEach(fn, timeout)
beforeAll(fn, timeout)
beforeEach(fn, timeout)


describe(name, fn) 限制作用域(分组)
describe.each(table)(name, fn, timeout) 遍历数组、对象将值参数传入fn中进行测试
describe.only(name, fn) 只执行当前测试
describe.skip(name, fn) 跳过当前测试

describe.only.each(table)(name, fn)
describe.skip.each(table)(name, fn)


test(name, fn, timeout) 测试函数
test.concurrent(name, fn, timeout) 同时执行测试
test.each(table)(name, fn, timeout) 遍历数组、对象将值参数传入fn中进行测试
test.failing(name, fn, timeout) 抛出错误的测试会通过，不抛出的不会通过
test.only(name, fn, timeout) 只执行当前测试
test.skip(name, fn) 跳过当前测试
test.todo(name) 将要写的测试，运行测试时会报错

test.concurrent.each(table)(name, fn, timeout)
test.concurrent.only.each(table)(name, fn)
test.concurrent.skip.each(table)(name, fn)
test.failing.each(name, fn, timeout)
test.only.failing(name, fn, timeout)
test.skip.failing(name, fn, timeout)
test.only.each(table)(name, fn)
test.skip.each(table)(name, fn)



## jest对象下的方法,jest对象也会被自动注入全局环境



jest.disableAutomock()
jest.enableAutomock()
jest.createMockFromModule(moduleName)
jest.mock(moduleName, factory, options)
jest.Mocked<Source>
jest.mocked(source, options?)
jest.unmock(moduleName)
jest.deepUnmock(moduleName)
jest.doMock(moduleName, factory, options)
jest.dontMock(moduleName)
jest.setMock(moduleName, moduleExports)
jest.requireActual(moduleName) 
jest.requireMock(moduleName) 
jest.resetModules()
jest.isolateModules(fn)
jest.isolateModulesAsync(fn)



jest.fn(implementation?) 生成一个mock函数
jest.isMockFunction(fn)
jest.replaceProperty(object, propertyKey, value)
jest.spyOn(object, methodName)
jest.spyOn(object, methodName, accessType?)
jest.Replaced<Source>
jest.Spied<Source>
jest.clearAllMocks()
jest.resetAllMocks()
jest.restoreAllMocks()



jest.useFakeTimers(fakeTimersConfig?) 调用此函数后，原生定时器相关的函数会被替换由jest其他函数控制
jest.useRealTimers() 还原原生定时器
jest.runAllTimers() 使所有定时器快速执行(宏任务和微任务队列都快速执行)
jest.runAllTicks() 微任务队列快速执行
jest.runOnlyPendingTimers() 只快速执行当前处于队列中的任务，新进队列中的不处理，可以用于递归定时器的测试

jest.runAllImmediates() 只快速执行setImmediate()的任务队列
jest.advanceTimersByTime(msToRun) 快进假定时器一定的时间
jest.advanceTimersToNextTimer(steps) 快进一定数量的定时器

jest.clearAllTimers() 清除队列中剩下的所有定时器
jest.getTimerCount() 返回还未运行的定时器数量
jest.now() 获取假定时器当前时间
jest.setSystemTime(now?: number | Date) 设置假定时器当前时间
jest.getRealSystemTime() 获取真实时间，模拟时间函数时不会影响此函数



jest.runAllTimersAsync() 同名方法的异步形式，似乎使让所有的微任务回调执行后才执行定时器???
>应该可以查询一下fake-timers库解决
jest.advanceTimersByTimeAsync(msToRun)
jest.runOnlyPendingTimersAsync()
jest.advanceTimersToNextTimerAsync(steps)




jest.getSeed() 获取一个伪随机数，每次jest执行都会生成一个伪随机数
jest.isEnvironmentTornDown()
jest.retryTimes(numRetries, options?) 失败的测试重新执行的次数
jest.setTimeout(timeout) 设置所有测试文件的before和after钩子的超时时间间隔




## mock函数上的属性、方法

mockFn.getMockName()
mockFn.mock.calls
mockFn.mock.results
mockFn.mock.instances
mockFn.mock.contexts
mockFn.mock.lastCall
mockFn.mockClear()
mockFn.mockReset()
mockFn.mockRestore()
mockFn.mockImplementation(fn)
mockFn.mockImplementationOnce(fn)
mockFn.mockName(name)
mockFn.mockReturnThis()
mockFn.mockReturnValue(value)
mockFn.mockReturnValueOnce(value)
mockFn.mockResolvedValue(value)
mockFn.mockResolvedValueOnce(value)
mockFn.mockRejectedValue(value)
mockFn.mockRejectedValueOnce(value)
mockFn.withImplementation(fn, callback)
Replaced Properties
replacedProperty.replaceValue(value)
replacedProperty.restore()
TypeScript Usage
jest.fn(implementation?)
jest.Mock<T>
jest.Mocked<Source>
jest.Replaced<Source>
jest.mocked(source, options?)
jest.Spied<Source>








## expect匹配器



.not

.resolves 用于处理异步函数prosmise的测试
.rejects

普通匹配器：


.toBe(value) 全等，对象值相同但引用对象不同会不匹配(通过Object.is方法判断)

.toEqual(value) 值相等，对对象、数组会递归比较内部，但不会比较值为undefined的字段

.toStrictEqual(value) 值严格相等，对对象、数组会比较值为undefined的字段

.toBeFalsy() 假值有6个：false、0、''、null、undefined、NaN
.toBeTruthy()

.toBeNull() 
.toBeNaN()

.toBeUndefined()
.toBeDefined() 

.toBeGreaterThan(number | bigint) 比较数字大小,注意浮点数是有精度的
.toBeGreaterThanOrEqual(number | bigint)
.toBeLessThan(number | bigint)
.toBeLessThanOrEqual(number | bigint)

.toBeCloseTo(number, numDigits?) 比较浮点数是否近似某一个值

.toContain(item) 可迭代对象中是否包含对应引用对象
.toContainEqual(item)



.toThrow(error?) 匹配对象是否满足子对象


.toMatch(regexp | string) 匹配正则

.toMatchObject(object) 期望对象是否

.toMatchSnapshot(propertyMatchers?, hint?) 第一次执行为创建快照，后续执行为对比快照
.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)



.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
.toHaveReturned()
.toHaveReturnedTimes(number)
.toHaveReturnedWith(value)
.toHaveLastReturnedWith(value)
.toHaveNthReturnedWith(nthCall, value)
.toHaveLength(number)
.toHaveProperty(keyPath, value?)

.toBeInstanceOf(Class) 是否为类的实例



.toThrowErrorMatchingSnapshot(hint?)
.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)



不对称匹配器：(放在匹配器函数参数中，用于构造一些特定值)




断言计数：
.assertions(number) 是否调用了对应数量的断言，???可以超过吗
.hasAssertions() 至少调用了一个断言















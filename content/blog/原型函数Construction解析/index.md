---
title:  原型函数Construction解析
cover: "/logos/logo-1024.png"
category: Web
tags:

    - Web
    - JavaScript

date: 11/11/2017
---

### 理解原型之间的关系

```
    testOne() {};
    testOne.prototype
    // Object {
            constructor: a()
                    arguments: null
                    caller: null
                    length: 0
                    name:"a"
                    prototype: Object
                    __proto__: ()
                    <function scope>
                    //注意层级关系
            __proto__: Object
        }
        
        
    testOne.length
    // output: 0
    
    
    testOne.prototype.name = '2';
    testOne.name
    // output: 'a';
```
**注意**: 这里输出为'a'，而不是２，它会去查constructor里面的name，因为prototype.constructor是会指回testOne，如果要获取＇２＇，只能testOne.prototype.name来获取.
	
```			
    const testTwo = new testOne();
    testTwo.prototype
    //output: undefined
```

**注意**: 每创建一个函数才会创建它的prototype对象，使用new，不会创建prototype对象
    
```   
    testTwo.constructor
    //output: testOne(){}
    
    testTwo.constructor.name = 'b';
    testTwo.name
    // output: testTwo
    
    Object.getOwnPropertyDescriptor(ｔｅｓｔTwo, 'name');
    // output: {value: "testTwo", writable: false, enumerable: false, configurable: true} 
```

所有原声的只可以delete，之后testOne.name输出为＇＇，不能修改.

```
    testTwo.constructor.names = 'c';
    testTwo.names
    // output: c
    
    Object,getOwnPropertyDescriptor(testTwo, 'names');
    // output: {value: "c", writable: true, enumerable: true, configurable: true}
```

非原生的属性，添加之后可以修改,所以在执行new操作时，将tetTwo的指针指向了testTwo.constructor
	
```
    testOne.prototype.newOne = '5';
    testTwo.newOne
    // output: '5'
    testTwo.newOne = '6';
    testTwo.newOne
    // output: '6'
    testTwo
    // output: 
        bbb:"444"
        __proto__:	Object
            bbb: "2"
            constructor: d()
            ＿_proto__: Object
```

newOne　屏蔽掉了原属性，因为将怎么testOne的指针指＿proto＿

```
    Object.keys(testTwo);
    // output: ['bbb']    
```

这也是为什么Object.keys只出现bbb，因为＿proto＿，constructor不可枚举.


```
    const name(){};
    name.prototype;
    // output: constructor: name()
                __proto__:Object               
    const nameTwo(){};
    nameTwo.prototype = {};
    nameTwo.prototype;
    // output: __proto__:Object
```
这也切断了与原型之间的联系，constructor变成了＿ｐｒｏｔｏ＿的属性


```
    const nameThree(){};
    Object.getOwnPropertyDescriptor(nameThree.prototype, 'constructor');
    // output: { writable: true, enumerable: false, configurable: true }
    nameThree.prototype = { constructor: nameThree};
    Object.getOwnPropertyDescriptor(nameThree.prototype, 'constructor');
    // output: {writable: true, enumerable: true, configurable: true}
```

操作prototype会使，constructor消失，如果手动改变，这会使constructor种的enumerable变成true（即可枚举）	
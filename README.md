# Rosetta 模板

注意别忘了pull下submodule~

## 安装 fis3

`npm install fis3 -g`

## 初始化

```bash
mkdir demo
cd demo
fis3 init rosetta
```

## 运行 & 预览

- 使用 FIS3 提供 server 预览

    环境要求：php-cgi > 5.2, java > 1.6 （*安装后莫忘设置环境变量*）

    ```bash
    fis3 release
    fis3 server install server-env
    fis3 server start --rewrite --type php
    ```

- PHP 自带 Server 预览
    
    很 Nice 的告诉大家，php 5.3 以后，php 自带一个 Server，可以方便调试 Web 应用 （*听说cookie支持不是很给力，注意*），这样就不需要装 Java 环境了！

    ```bash
    fis3 release -d output
    fis3 server install server-env --root ./output
    cd ./output
    php -S 127.0.0.1:8080 ./index.php
    ```

## 产出产品代码

```bash
fis3 release -d ./output --media production
```

## 自动生成新的element脚手架
```bash
    fis3 init element
```

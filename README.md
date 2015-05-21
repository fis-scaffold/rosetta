# Rosetta 模板

## 安装 fis3

`npm install fis3 -g`

## 初始化

```bash
mkdir demo
cd demo
fis3 init rosetta
```

## 运行 & 预览

```bash
fis3 release
fis3 server install server-env
fis3 server start --rewrite --type php
```

## 产出产品代码

```
fis3 release production -d ./output
```

## 自动生成新的element脚手架

```
fis3 init element
```

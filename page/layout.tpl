<!DOCTYPE html>
<html>
<head>
    <title>My Application</title>
    <meta charset="utf-8">
    <script type="text/javascript" src="/components/rosetta/Rosetta.js" data-framework></script>
    <link rel="stylesheet" type="text/css" href="/components/boostui/boost.css">
    <script type="text/javascript" src="/components/boostui/boost.js"></script>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1" />
</head>
<body>
    <div id="wrap">

        <div class="body">
          <link rel="import" href="/elements/r-sample.html" />
          <link rel="import" href="/components/boost-slider/r-slider.html" />

          <r-sample>
            <p>显示一下嘛</p>

            <r-slider class="a" list='[{"text":"这是图片1的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"},{"text":"这是图片2的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"},{"text":"这是图片3的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"},{"text":"这是图片4的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"}]'>
            </r-slider>

            <div class="aaa">
              <div>
                <r-slider class="b" list='[{"text":"这是图片1的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"},{"text":"这是图片2的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"},{"text":"这是图片3的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"},{"text":"这是图片4的标题","img":"http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg"}]'>
                </r-slider>
              </div>
            </div>
          </r-sample>
          {%block name="body"%}{%/block%}
        </div>
    </div>
</body>
</html>

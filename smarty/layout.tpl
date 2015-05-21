<!DOCTYPE html>
<html>
<head>
    <title>My Application</title>
    <meta charset="utf-8">
    <script type="text/javascript" src="/static/mod.js"></script>
    <script type="text/javascript" src="/static/Rosetta.js"></script>
    <script type="text/javascript" src="/static/lib.js"></script>
    <script type="text/javascript">
    require(['/static/modules/a.js', '../static/modules/b.js']);
    </script>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1" />
</head>
<body>
    <div id="wrap">

        <div class="body">
          <link rel="import" href="/elements/r-slider.html" />
          <r-slider>
              <ul class="blend-slides">
                  <li>
                      <img src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" />
                      <div class="blend-slider-title">这是图片1的标题</div>
                  </li>
                  <li>
                      <img src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" />
                      <div class="blend-slider-title">这是图片2的标题</div>
                  </li>
                  <li>
                      <img src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" />
                      <div class="blend-slider-title">这是图片3的标题</div>
                  </li>
                  <li>
                      <img src="http://pic.4j4j.cn/upload/pic/20130530/f41069c61a.jpg" />
                      <div class="blend-slider-title">这是图片4的标题</div>
                  </li>
              </ul>
          </r-slider>
            {%block name="body"%}{%/block%}
        </div>
    </div>
</body>
</html>

<!-- <!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

</body>
</html> -->


<!DOCTYPE html>
<html>
<head>
    <title>My Application</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/static/style.css" />
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <!-- 添加 data-framework 字段的js，编译处理的时候会解析为需要优先加载的，会被放置到其他script的上面 -->
    <script type="text/javascript" data-framework src="../static/Rosetta.js"></script>

    <script type="text/javascript" data-framework src="../static/jquery.min.js"></script>
</head>
<body>
    <div id="wrap">

        <div class="body">
            <link rel="import" href="/elements/r-tabs.html" />
            {%$ref='tabs2'%}
            {%$aa='lalala'%}
            {%$items=[
                [
                    title=> "卡片1",
                    selector=> ".content1"
                ],
                [
                    title=> "卡片2",
                    selector=> ".content2"
                ],
                [
                    title=> "卡片3",
                    selector=> ".content3"
                ]
            ]%}
            <r-tabs class="sdsd"></r-tabs>
            <r-tabs data='{"items":{%json_encode($items)%}, "ref":"{%$ref%}"}' class="r-element {%$aa%}">
              <div class="content1">内容 1</div>
              <div class="content2">内容 2</div>
              <div class="content3">内容 3</div>
            </r-tabs>

            <link rel="import" href="/elements/r-todoapp.html" />

        <section id="todoapp">
            <header id="header">
                <h1>todos</h1>
                <input id="new-todo" placeholder="What needs to be done?" autofocus/>
            </header>

            <section id="main">
                <input id="toggle-all" type="checkbox" />
                <label for="toggle-all">Mark all as complete</label>

                <r-todoapp data='{"ref":"aaa", "list":[], "adsd": {"d":1, "c":3}}' class="r-element r-invisible">

                </r-todoapp>
            </section>

            <footer id="footer">
                <span id="todo-count">
                    <strong>
                    </strong>

                </span>
                <ul id="filters">
                    <li>
                        <a class="selected" href="#/"></a>
                    </li>
                    <li>
                        <a href="#/active"></a>
                    </li>
                    <li>
                        <a href="#/completed"></a>
                    </li>
                </ul>
            </footer>
        </section>
        </div>
    </div>


    <script type="text/javascript">
        var $newtodo = $('#new-todo');
        function submitChange (e) {
            if (e.which === 13 && $newtodo.val().trim()) {
                var tag = Rosetta.ref('aaa');

                tag.attrs.list.push({
                    completed: '',
                    title: $newtodo.val().trim()
                });

                tag.update({
                    list: tag.attrs.list
                });
                $newtodo.val('');
            }
        }

        Rosetta.ready(function() {
            alert('all elements render done');
            var tabs2 = Rosetta.ref('tabs2');
            var slider = Rosetta.ref('slider');
            tabs2.switchTo(1);
            tabs2.on('attributeChange', function() {
                console.log(tabs2.attrs.items[0]);
            });

            tabs2.update({
                items: [
                    {
                        title: 'gaojiexuan',
                        content: '内容1'
                    },

                    {
                        title: '选项卡2',
                        content: '内容2'
                    }
                ]
            });

            $(document.body).on('keypress', function(e) {
                submitChange(e);
            });
        });

    </script>

</body>
</html>

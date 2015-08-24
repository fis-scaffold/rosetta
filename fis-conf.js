// fis.set('project.files', '*.{html,tpl}');

fis
    .match('*.{html,tpl}', {
        parser: fis.plugin('rosetta', {
            compileUsage: false
        })
    })

    .match('*.tpl', {
        release: '/template/$0'
    })

    .match('/elements/r-*.html', {
        rExt: '.js'
    })
    .match('/elements/*.*', {
        release: '/static/$0'
    })

    .match('/components/**/r-*.html', {
        rExt: '.js'
    })

    .match('/components/(**/*.*)', {
        useMap: true,
        release: '/static/$1'
    })

    .match('*.{tpl,html,js}', {
      preprocessor: fis.plugin('rosetta-import')
    })

    .match('::packager', {
        postpackager: fis.plugin('rosetta', {
            allInOne: false
        })
    });

// 在 dev 环境下关闭文件 md5 hash
fis
    .media('dev')
    .match('*.{css,js,html}', {
        useHash: false
    })
    // .set('deploy', {
    //   receiver: 'http://dbl-dev-rd22.vm.baidu.com:8343/receiver',
    //   from: '/',
    //   subOnly: true,
    //   to: '/home/work/webroot/templates/templates/eva_zhidaorder_gao'
    // })


// fis3 release production
fis
    .media('production')
    // 压缩 js 通过 uglify
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    })

    // 这里面也是 js
    .match('/elements/*.html', {
        optimizer: fis.plugin('uglify-js')
    })

    // 压缩 css
    .match('*.css', {
        optimizer: fis.plugin('clean-css')
    })

    // 压缩 png
    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })

    // .match('::packager', {
    //     postpackager: fis.plugin('rosetta', {
    //         allInOne: true
    //     })
    // });

fis.set('project.files', '*.{html,tpl}');

fis
  .match('*.{html,tpl}', {
    parser: fis.plugin('rosetta', {
      compileUsage: false
    })
  })
  .match('*.tpl', {
    release: '/template/$0'
  })
  .match('*.{css,js,html}', {
    useMap: true,
    release: '/static/$0'
  })
  .match('/elements/*.html', {
    rExt: '.js'
  })
  .set('modules.postpackager', fis.plugin('rosetta'))

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

  // 通过 rosetta 插件优化资源。
  .set('modules.postpackager', fis.plugin('rosetta', {
    // 合并零碎文件
    allInOne: true
  }))

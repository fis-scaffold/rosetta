fis.set('project.files', '*.html');

fis
  .match('static/rosetta/**/*.js', {
    isMod: false
  })
  .match('boostui/**/*.js', {
    isMod: false
  })


fis
  .match('*.html', {
    parser: fis.plugin('rosetta')
  })
  .match('*.{css,js,html}', {
    useMap: true
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
  });

// fis3 release production
fis
  .media('production')
  // 压缩 js 通过 uglify
  .match('*.js', {
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

  // 配置开启是否编译 element 使用模板。
  .match('/elements/*.html', {
    parser: fis.plugin('rosetta', {
      compileUsage: true
    })
  })

  // 通过 rosetta 插件优化资源。
  .set('modules.postpackager', fis.plugin('rosetta', {

    // 合并零碎文件
    allInOne: true,

    // 收集合并 脚本和样式文件。默认只会收集依赖，开启此选项后，页面中所有 js 和 css 都会被收集和合并。
    obtainScript: true,
    obtainStyle: true
  }));

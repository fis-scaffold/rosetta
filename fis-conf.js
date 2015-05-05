fis.set('project.files', '*.html');

fis.match('*.html', {
  parser: fis.plugin('rosetta')
});

fis
  .match('*.{css,js,html}', {
    useMap: true
  });

// fis3 release --media production
fis
  .media('production')

  .match('*.js', {
    optimizer: fis.plugin('uglify-js'),
    useHash: true,
    useDomain: true,
    useMap: true
  })

  .match('*.css', {
    optimizer: fis.plugin('clean-css'),
    useHash: true,
    useDomain: true,
    useMap: true
  })

  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  });


// 开启 autuload, 好处是，依赖自动加载。
fis.set('modules.postpackager', fis.plugin('autoload'));

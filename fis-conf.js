fis.set('project.files', '*.html');

fis.media('dev')
  .match('**', {
    useHash: false,
    useDomain: false
  });


fis.match('*.html', {
  parser: fis.plugin('rosetta')
});

// 开启 autuload, 好处是，依赖自动加载。
fis.set('modules.postpackager', fis.plugin('autoload'));

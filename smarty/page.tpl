{%extends file="./layout.tpl"%}

{%block name="body"%}
  <link rel="import" href="/elements/r-tabs.html" />
  <r-tabs></r-tabs>

  <script type="text/javascript" src="/static/lib.js"></script>
  <script type="text/javascript">
  require(['/static/modules/a.js']);
  </script>
{%/block%}

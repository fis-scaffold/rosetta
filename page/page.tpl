{%extends file="./layout.tpl"%}

{%block name="body"%}
<!--   <link rel="import" href="/elements/r-tabs.html" />
  <r-tabs></r-tabs> -->
  <div class="tabsxxx">

  </div>

  <r-tabs>
  </r-tabs>


  <link rel="import" href="/elements/r-todoapp.html" />
  <r-todoapp list='[{"title":1212112,"completed":true}]'></r-todoapp>


<script type="text/javascript">
    Rosetta.import('/elements/r-tabs.html', function () {
        Rosetta.render(Rosetta.create('r-tabs'), $('.tabsxxx')[0], true);
        Rosetta.render();
    });
</script>
{%/block%}

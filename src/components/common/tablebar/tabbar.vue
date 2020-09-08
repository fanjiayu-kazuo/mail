<template>
  <div id="tablebar">
    <slot></slot>
  </div>
</template>

<script>
  export default{

  }
</script>

<style >
  #tablebar{
    display: flex;
    background-color: #DADADA;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;

    box-shadow: 0px -3px 1px rgba(100,100,100,0.1);
  }

</style>

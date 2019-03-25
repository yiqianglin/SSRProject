<template>
  <div>
      <li v-for="item in dt">{{ item.text }}</li>
  </div>
</template>

<script>
    export default {
        name: 'TestComp',
        props: {
            dt: {
            }
        }
    }
</script>

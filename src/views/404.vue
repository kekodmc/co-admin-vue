<template>
    <div class="text-center">
       <v-sheet>
           <v-card-text>
               <v-icon size="100">mdi-book-open-page-variant</v-icon>
               <h1 class="ma-5">404</h1>
               <h3 class="ma-5">您要查看的页面不存在</h3>
           </v-card-text>
       </v-sheet>
        <v-btn class="mt-5" fab to="/">
            <v-icon>mdi-home</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped>

</style>
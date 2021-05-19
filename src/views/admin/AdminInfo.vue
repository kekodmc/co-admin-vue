<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">订单详情</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" v-if="info">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>用户名</v-list-item-title>
                      <v-list-item-subtitle>{{info.nickname}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>创建时间</v-list-item-title>
                      <v-list-item-subtitle>{{info.create_time}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="open = false">关闭</v-btn>
          <v-btn color="primary" text @click="callback">回调</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AdminInfo",
  inject:['$toast'],
  data(){
    return {
      open:false,
      info:null,
    }
  },
  methods:{
    show(item){
      this.info=item
      this.open=true
    },
    callback(){
      this.$emit('callback',this.info)
    }
  },
}
</script>

<style scoped>

</style>
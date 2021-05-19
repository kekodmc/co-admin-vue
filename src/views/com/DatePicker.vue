<template>
  <div>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="dateRangeText"
            :label="label"
            prepend-inner-icon="mdi-calendar"
            readonly
            single-line
            hide-details
            v-bind="attrs"
            v-on="on"
            clearable
            @click:clear="clearDate"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="date"
          no-title
          scrollable
          range
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="menu = false"
        >
          关闭
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
        >
          确定
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "DatePicker",
  props:{
    value:{
      type:Array,
      default:()=>[],
    },
    label:{
      type:String,
      default:'选择时间范围'
    }
  },
  data(){
    return {
      open:false,
      menu: false,
      date: this.value,
    }
  },
  methods:{
    clearDate(){
      this.date=[]
      // this.$emit('input',[])
    }
  },
  created() {
    // if(this.date.length<1){
    //   let dt=dateFormat('yyyy-MM-dd')
    //   this.date=[dt,dt]
    // }
  },
  computed: {
    dateRangeText:{
      get(){
        this.$emit('input',this.date)
        return this.date.join(' 至 ')
      },
      set(){

      }
    },
  },
}
</script>

<style scoped>

</style>
<template>
    <div>
      <v-card>
        <v-card-text>
          <v-row
            justify="space-around"
            align="center"
        >
          <v-card class="mb-5">
            <v-card-title>日期选择器</v-card-title>
            <v-card-text>
              <v-date-picker
                  v-model="picker"
              ></v-date-picker>
            </v-card-text>
          </v-card>
          <v-card class="mb-5">
            <v-card-title>时间选择器</v-card-title>
            <v-card-text>
              <v-time-picker
                  v-model="time"
                  class="mt-4"
                  format="24hr"
                  scrollable
                  min="9:30"
                  max="22:15"
              ></v-time-picker>
            </v-card-text>
          </v-card>
          <v-card class="mb-5">
            <v-card-title>颜色选择器</v-card-title>
            <v-card-text>
              <v-color-picker
                  v-model="colorPicker"
                  flat
              ></v-color-picker>
            </v-card-text>
          </v-card>
        </v-row>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                picker: null,
                time:'11:15',
                colorPicker: null,
            }
        }
    }
</script>

<style scoped>

</style>

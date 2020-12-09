<template>
    <div>
        <v-combobox
                v-model="model"
                :filter="filter"
                :hide-no-data="!search"
                :items="items"
                :search-input.sync="search"
                hide-selected
                label="设置规格"
                multiple
                small-chips
        >
            <template v-slot:no-data>
                <v-list-item>
                    <span class="subheading pr-2">添加值</span>
                    <v-chip
                            :color="`${colors[nonce - 1]} lighten-3`"
                            label
                            small
                    >
                        {{ search }}
                    </v-chip>
                    <span class="subheading pl-2">按回车键<kbd>enter</kbd>完成</span>
                </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                        v-if="item === Object(item)"
                        v-bind="attrs"
                        :color="`${item.color} lighten-3`"
                        :input-value="selected"
                        label
                        small
                >
          <span class="pr-2">
            {{ item.text }}
          </span>
                    <v-icon
                            small
                            @click="parent.selectItem(item)"
                    >close</v-icon>
                </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
                <v-text-field
                        v-if="editing === item"
                        v-model="editing.text"
                        autofocus
                        flat
                        background-color="transparent"
                        hide-details
                        solo
                        @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                        v-else
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                >
                    {{ item.text }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                    <v-btn
                            icon
                            @click.stop.prevent="edit(index, item)"
                    >
                        <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-combobox>
    </div>
</template>

<script>
    export default {
        name: "FormatItem",
        props:{
            value:{
                type:String,
                default:'',
                required:true,
            },
        },
        data(){
            return{
                activator: null,
                attach: null,
                colors: ['blue','green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
                editing: null,
                index: -1,
                items: [
                    { header: '选择或者输入一个值' },
                    // {
                    //     text: '默认',
                    //     color: 'blue',
                    // },
                ],
                nonce: 1,
                menu: false,
                model: [
                    // {
                    //     text: '默认',
                    //     color: 'blue',
                    // },
                ],
                x: 0,
                search: null,
                y: 0,
            }
        },
        methods:{
            edit(index, item) {
                if (!this.editing) {
                    this.editing = item
                    this.index = index
                } else {
                    this.editing = null
                    this.index = -1
                }
            },
            filter (item, queryText, itemText) {
                if (item.header) return false

                const hasValue = val => val != null ? val : ''

                const text = hasValue(itemText)
                const query = hasValue(queryText)

                return text.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            },
            initData(val){
                this.model=[]
                this.items=[]
                this.nonce=1
                if(!val)return
                let arr=val.split(',')
                for(let i=0;i<arr.length;i++){
                    let item={
                        text:arr[i],
                        color:this.colors[this.nonce - 1]
                    }
                    this.items.push(item)
                    this.model.push(item)
                    this.nonce++
                }
            }
        },
        created(){
            this.initData(this.value)
        },
        watch: {
            value(val){
                this.initData(val)
            },
            model (val, prev) {
                if (val.length === prev.length) return

                this.model = val.map(v => {
                    if (typeof v === 'string') {
                        v = {
                            text: v,
                            color: this.colors[this.nonce - 1],
                        }

                        this.items.push(v)

                        this.nonce++

                    }

                    return v
                })

                let arr=[]
                for (let i=0;i<this.model.length;i++){
                    arr.push(this.model[i].text)
                }

                this.$emit('input',arr.join(','))
                this.$emit('change')

            },
        },
    }
</script>

<style scoped>

</style>

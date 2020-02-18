<template>
    <div class="popout">
        <div class="colourList">
            <div class="title">Changing colour for: {{changing}}</div>
            <div 
                class="swatch"
                v-for="(val, key) of $root.palette"
                :key="val.ID"
                
                :style="{backgroundColor: val}"
                :data-key="key"
                @click="$emit('selectColour', {'name': key, 'colour': val})"
                >
                
                <div class="id">{{key}}</div>
            </div>

            <div 
                class="swatch"
                v-for="(val, key) of $store.state.workspace.palette"
                :key="val.ID"
                
                :style="{backgroundColor: val}"
                :data-key="key"
                @click="$emit('selectColour', {'name': key, 'colour': val})"
                >
                
                <div class="id">{{key}}</div>
            </div>

            <div class="swatch centre" @click="picker.shown = !picker.shown"><font-awesome-icon icon="plus" /></div>

            <div class="colorPopout card" v-show="picker.shown">
                <div class="content">
                    <input type="text" maxlength="1" v-model="picker.code" :style="codeInUse(picker.code)">
                    <color-picker class="colorPicker" v-model="colors" />

                    <button class="btn" @click="addColor">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
    name: 'colourpopout',
    props: ['changing'],
    components: {
        colorPicker: Chrome 
    },
    data() { return {
        picker: {
            code: "",
            shown: false,
            target: null
        },
        colors: "#fff"
    }},
    methods: {
        codeInUse(code) {
            if(this.$root.palette[code] === undefined && this.$store.state.workspace.palette[code] === undefined) {
                return null;
            }
            return {
                backgroundColor: "red"
            }
        },
        addColor() {
            if(this.picker.code.length != 1) {
                return;
            }
            this.$store.commit("workspace/addSwatch", {
                id: this.picker.code, 
                hex: this.colors.hex.toLowerCase()
            });

            this.picker.shown = false;
            this.picker.code = "";
        }
    }
}
</script>

<style scoped lang="scss">
    .popout {
        position: absolute;

        border-radius: 1rem;
        background: #202225;
        color: #fff;

        .title {
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }

        .colourList {
            padding: 1rem;
            width: 273px;

            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
        
            .swatch {
                width: 35px;
                height: 35px;
                margin: 2px;
                cursor: pointer;

                .id {
                    padding: .1rem .2rem;
                    background-color: rgba(0,0,0, 0.5);
                    color: #fff;
                }
                
                &.centre {
                    display: flex;
                    font-size: 1.25rem;

                    svg {
                        margin: auto;
                    }
                }
            }
        }
    }

    .colorPopout {
        position: absolute;
        left: 10%;
        top: 100%;
    }
    .card {
        background-color: #37393f;
    }
    .card .content {
        padding: 1rem;
    }
</style>

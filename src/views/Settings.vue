<template>
    <div class="page">
        <div class="left">
            <span class="header">Settings</span>
            <ul class="nav">
                <li 
                    v-for="(tab, id) of tabs.set"
                    :key="id"

                    class="pill" 
                    :class="{'active': tabs.active == id}"
                    @click="tabs.active = id">
                        <span>{{tab}}</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="pageHeader">
                <span class="header">{{tabs.set[tabs.active]}}</span>
                <div class="closeContainer"><router-link class="close" to="/"><font-awesome-icon icon="times-circle"></font-awesome-icon></router-link></div>
            </div>

            <div class="tabs">
                <div v-show="isActive('layout')">
                    <div class="optionGroup">
                        <span class="name">Pixel Size</span>
                        <input type="number" :v-model="$root.userSettings.settings.workspace.pixelSize" @change="$root.saveSettings">px
                    </div>
                    <div class="optionGroup">
                        <span class="name">Toolbox Mounting Position</span>
                        <position-selector :value="$root.userSettings.settings.workspace.layout.toolbox" @input="toolboxChanged"></position-selector>
                    </div>
                    <div class="optionGroup">
                        <span class="name">Animation Timeline Mounting Position</span>
                        <position-selector :value="$root.userSettings.settings.workspace.layout.timeline" @input="timelineChanged"></position-selector>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import positionSelector from '../components/settings/positionSelector';

export default {
    name: 'settings',
    components: {positionSelector},
    data: () => {return {
        tabs: {
            active: 'layout',
            set: {layout: 'Layout', other: 'Another pill in the list'},
        },
    }},
    methods: {
        isActive(tabName) {
            return this.tabs.active == tabName;
        },
        toolboxChanged(event) {
            this.$root.userSettings.settings.workspace.layout.toolbox = event;
            this.$root.saveSettings();
        },
        timelineChanged(event) {
            this.$root.userSettings.settings.workspace.layout.timeline = event;
            this.$root.saveSettings();
        }
    },
}
</script>

<style scoped lang="scss">
    .page {
        display: flex;
        flex-direction: row;
        height: 100%;
        font-weight: 500;
        
        .left {
            padding: 2rem 1.5rem;
            
            background: #202225;
            
            .header {
                font-size: 1.5rem;
                font-weight: bold;
                color: #fff;
            }
        }
        .right {
            padding: 2rem;
            width: 100%;
        }
    }

    .pageHeader {
        display: flex;
        flex-direction: row;

        width: 100%;
        color: #fff;
        margin-bottom: 1.5rem;

        .closeContainer {
            margin-left: auto;
            .close {
                font-size: 1.8rem;
                color: #fff;
            }
        }

        .header {
            font-weight: 600;
            font-size: 1.2rem;
            line-height: 36px;
        }
    }
    .optionGroup {
        .name {
            display: block;
            color: #fff;
            margin-bottom: 5px;
        }
        .name::after {
            content: ':';
        }
    }

    .nav {
        list-style: none;

        display: flex;
        flex-wrap: wrap;

        margin-top: 0;
        padding: 0;
        padding-top: 2rem;

        
        .pill {
            transition: background ease-in-out .1s;
            padding: .5rem 1rem;
            color: #fff;
            border-radius: 0.25rem;
        }
        .pill:hover {
            cursor: pointer;
        }
        .pill.active {
            background: #37393f;
        }
    }
</style>

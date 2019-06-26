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

                <li class="spacer"></li>
                <li class="pill" :class="{'active': tabs.active == 'credits'}" @click="tabs.active = 'credits'">Credits</li>
                <li class="pill"><a href="https://github.com/LegendEffects/PixelBot-Designer"><font-awesome-icon icon="link" />&nbsp;&nbsp;Github</a></li>
            </ul>
        </div>
        <div class="right">
            <div class="pageHeader">
                <span class="header">{{tabs.set[tabs.active] || tabs.manual[tabs.active]}}</span>
                <div class="closeContainer"><router-link class="close" to="/"><font-awesome-icon icon="times-circle" /></router-link></div>
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

                <div v-show="isActive('credits')" class="credits">
                    <div>Original PixelBot concept invented by <a href="https://laboratory424.com">Laboratory424</a><br></div>

                    <div>Editor developed by <a href="https://legendeffects.co.uk">LegendEffects</a><br></div>
                    <div>Original Editor by <a href="https://clawstudios.com">Claw Studios</a><br></div>
                    <div>First editor concept by <a href="https://www.twitch.tv/CaptainPDA">CaptainPDA</a><br></div>
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
            set: {layout: 'Layout', other: 'Another pill in the list',},
            manual: {credits: 'Credits'},
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
        color: #fff;
        
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

        a {
            color: rgb(210, 210, 210);
            text-decoration: none;
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
        flex-direction: column;
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

        .pill a {
            color: #fff;
            text-decoration: none;
        }

        .spacer {
            margin: 10px 0;
            border-top: solid 2px #ccc;
        }
    }

    .credits {
        font-size: 1.2rem;
        div {
            margin-top: 10px;
        }
    }
</style>

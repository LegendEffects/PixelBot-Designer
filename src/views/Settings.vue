<template>
    <div class="page">
        <div class="back">
            <span @click="$router.go(-1)"><font-awesome-icon icon="arrow-circle-left"></font-awesome-icon> Click Here to go Back</span>
        </div>

        <div class="title">Settings</div>
        <div class="standout">
            <div class="optionGroup">
                <span class="name">Toolbox Mounting Position</span>
                <select v-model="$root.userSettings.settings.workspace.layout.toolbox" @change="$root.saveSettings">
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'settings',

}
</script>

<style scoped lang="scss">
    .page {
        padding: 2rem;
    }
    .page .title {
        width: 65%;
        border-top: 1px solid #fff;
        padding-top: 20px;
        margin-top: 20px;
        font-size: 2rem;
        color: #fff;
    }

    .standout {
        background: #202225;
        margin-top: 10px;
        padding: 1rem;
        border-radius: 1rem;
    }

    .back {
        color: #fff;
    }
    .back:hover {
        cursor: pointer;
    }

    .optionGroup .name {
        display: block;
        color: #fff;
    }
    .optionGroup .name::after {
        content: ':';
    }

</style>

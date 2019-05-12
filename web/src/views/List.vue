<template>
    <div>
        <ul>
            <li v-for="(item) in list" :key="item">
                {{item.lid}}--{{item.name}}
            </li>
        </ul>
        <p v-html="`<h1>hello</h1>`"></p>
    </div>
</template>
<script>
export default {
    name:"list",
    data(){
        return {
            list:[{lid:1,name:"zyz"},{lid:2,name:"Jane"}]
        }
    }
}
</script>
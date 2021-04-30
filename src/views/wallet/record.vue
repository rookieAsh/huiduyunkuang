<template>
    <div class="recordPage">
        <div class="k60"></div>
        111
        <div class="content">
            <div class="item  align-center" v-for="(item,index) in list" :key="index">
                <div class="itemLI">USDT</div>
                <div class="itemLI">{{item.create_time}}</div>
                <div class="itemLI">{{ item.side == 'deposit'? '充币':'提币' }}</div>
                <div class="itemLI">{{item.money}}</div>
                <div class="itemLI text-right" v-if="item.status=='success'">交易成功</div>
                <div class="itemLI text-right" v-if="item.status=='pending'">审核中</div>
                <div class="itemLI text-right" v-if="item.status=='fail'">交易失败</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            let param = new URLSearchParams();
            let address = sessionStorage.getItem("address");
            param.append("address", address);
            param.append("coin", 'USDT');
            this.$axios.post("/custody/selectUsdtRecord",param).then((res)=>{
                let result = res.data.data
                console.log(result)
                this.list = result
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .content {
        width: 1200px;
        padding: 50px 0;
        margin: 0 auto;
        .item {
            width: 800px;
            height: 80px;
            border-bottom: 1px solid #ececec;
            margin: 20px auto 0;
            .itemLI {
                width: 25%;
                color: #000;
                font-size: 20px;
            }
        }
    }
</style>
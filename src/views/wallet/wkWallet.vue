<template>
    <div class="wkWalletPage">
        <div class="k60"></div>
        <div class="content">
            <div class="assets">
                <div class="flex">
                    <div class="name">账户总资产</div>
                    <div class="num">￥{{assets + assets1 |number(8)}}</div>
                </div>
            </div>
            <div class="line"></div>
            <div class="th flex">
                <div class="li">币种</div>
                <div class="li">昨日收益</div>
                <div class="li">累计挖出</div>
                <div class="li">可取出</div>
            </div>
            <div class="td flex margin20">
                <div class="li">{{btcObj.subarea}}</div>
                <div class="li">{{btcObj.yesterdayEarnings |number(8)}}</div>
                <div class="li">{{btcObj.sumEarnings |number(8)}}</div>
                <div class="li">{{btcObj.calidEarnings |number(8)}}</div>
            </div>
            <div class="td flex margin20">
                <div class="li">{{ethObj.subarea}}</div>
                <div class="li">{{ethObj.yesterdayEarnings |number(8)}}</div>
                <div class="li">{{ethObj.sumEarnings |number(8)}}</div>
                <div class="li">{{ethObj.calidEarnings |number(8)}}</div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    data(){
        return{
            assets:'',
            assets1:'',
            btcObj:{},
            ethObj:{}
        }
    },
    created(){
        this.getInfo()
        this.getInfo1()
    },
    methods:{
        // 挖矿钱包
			getInfo(){
                let param = new URLSearchParams();
                let address = sessionStorage.getItem("address");
                param.append("address", address);
                param.append("type", 1);
                this.$axios.post('/custody/checkMiningEarnings',param).then((res)=>{
                    let result = res.data.data;
                    this.assets = Number(result[0].countEarnings);
                    this.btcObj = result[1]
                    console.log(this.assets)
                })
				
			},
            getInfo1(){
                let param = new URLSearchParams();
                let address = sessionStorage.getItem("address");
                param.append("address", address);
                param.append("type", 2);
                this.$axios.post('/custody/checkMiningEarnings',param).then((res)=>{
                    let result = res.data.data;
                    this.assets1 = Number(result[0].countEarnings)
                    this.ethObj = result[1]
                })
				
			}
    }
}
</script>


<style lang="less" scoped>
 .content {
        width: 1200px;
        padding: 80px 0;
        margin: 0 auto;
        .assets {
            width: 100%;
            height: 80px;
            display: flex;
            line-height: 80px;
            .name {
                color: #000;
                font-size: 28px;
                font-weight: 600;
            }
            .num {
                color: #999;
                font-size: 28px;
                padding-left: 20px;
            }
        }
        .line {
            width: 1200px;
            height: 5px;
            background: #FFF5ED;
        }
        .th {
            width: 100%;
            margin-top: 40px;
            .li {
                width: 25%;
                font-size: 20px;
            }
        
        }
        .td {
            height: 80px;
            border-bottom: 1px solid #DBDBDB;
            
           .li {
                width: 25%;
                font-size: 20px;
                line-height: 80px;
                .cell1 {
                    width: 120px;
                    height: 48px;
                    background: #7E66F0;
                    border-radius: 5px;
                    line-height: 48px;
                    color: #fff;
                    font-size: 20px;
                    cursor: pointer;
                }
                .cell2 {
                    width: 120px;
                    height: 48px;
                    background: #FF9915;
                    border-radius: 5px;
                    line-height: 48px; 
                    color: #fff;
                    font-size: 20px;
                    cursor: pointer;
                }
                .cell3 {
                    width: 120px;
                    height: 48px;
                    background: #000000;
                    border-radius: 5px;
                    line-height: 48px; 
                    color: #fff;
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
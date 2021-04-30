<template>
    <div class="invitePage">
        <div class="k60"></div>
        <div class="content">
            <div class="img">
                <img src="../../assets/imgs/poster3.png" alt="">
                <div class="code">
                    <img class="image" v-if="img != ''" :src="img" :style="{ width: size+'px', height: size + 'px' }"/>
                </div>
            </div>
            <div class="tip text-center">邀请新用户 获得更多返佣 手机扫码 注册下载APP </div>
        </div>
    </div>
</template>

<script>
import QR from "../../common/qrcode/qrcode.js";
export default {
    data(){
        return{
            ChargeShow:false,
            WithdrawShow:false,
            TransferShow:false,
            val:'1111',
			img:'',
			size:80,
        }
    },
    created(){
        let url = this.$axios.defaults.baseURL
        this.val = url + '/index.html?code=' +sessionStorage.getItem('inviteCode')
        this.creatQrcode()
    },
    methods:{
        creatQrcode(){
			let val = String(this.val)
			if(val == ''){
				return false
			}
			let img = QR.createQrCodeImg(val, {
				size: parseInt(this.size)
			})
			this.img = img;	
		},
    }
}
</script>


<style lang="less" scoped>
    .content {
        width: 1200px;
        
        margin: 0 auto;
        padding: 50px 0;
        .img {
            width: 350px;
            height: 600px;
            margin: 0 auto;
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            .code {
                position: absolute;
                right: 5px;
                bottom: 10px;
             }
        }
        .tip {
            padding: 30px 0;
        }
    }
</style>
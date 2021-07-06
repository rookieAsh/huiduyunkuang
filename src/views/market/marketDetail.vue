<template>
  <div class="maeketDetailPage">
    <div class="k60"></div>
    <div class="banner margin0">
      <div class="left">
        <div class="name">{{ detailObj.name }}</div>
        <!-- <div class="name">230M 现货 </div> -->
        <!-- <div class="countDown flex align-center">
                  <div class="border">04</div>
                  <span>天</span>
                  <div class="border">07</div>
                  <span>:</span>
                  <div class="border">56</div>
                  <span>:</span>
                  <div class="border">56</div>
                  <span>后结束</span>
                </div> -->
        <div class="pic">
          <img :src="picImage" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="starTime">开始挖矿时间：{{ detailObj.mining_time }}</div>
        <div class="th flex">
          <div class="th_li">矿机算力</div>
          <div class="th_li">矿机功耗</div>
          <div class="th_li" v-if="detailObj.cmc_subarea == 'XCH'">托管费</div>
          <div class="th_li" v-else>电费</div>
        </div>
        <div class="td flex">
          <div class="td_li" v-if="detailObj.cmc_subarea == 'BTC'">
            {{ detailObj.hashrate }}TH/S
          </div>
          <div class="td_li" v-if="detailObj.cmc_subarea == 'ETH'">
            {{ detailObj.hashrate }}MH/S
          </div>
          <div class="td_li" v-if="detailObj.cmc_subarea == 'XCH'">
            {{ detailObj.hashrate }}TH/S
          </div>
          <div class="td_li">{{ detailObj.power_diss }}KW/台</div>
          <div class="td_li" v-if="detailObj.cmc_subarea == 'XCH'">
            {{ detailObj.electric_charge }}元/T/月
          </div>
          <div class="td_li" v-else>{{ detailObj.electric_charge }}元/KW*h</div>
        </div>
        <div class="th flex" style="margin-top:30px">
          <div class="th_li" v-if="detailObj.cmc_subarea != 'XCH'">
            预计日产币
          </div>
          <div class="th_li">管理费</div>

          <div class="th_li" v-if="detailObj.cmc_subarea != 'XCH'">
            回本天数
          </div>
          <div class="th_li" v-else>
            停售时间
          </div>
        </div>
        <div class="td flex">
          <div class="td_li" v-if="detailObj.cmc_subarea != 'XCH'">
            {{ detailObj.earnings }}{{ detailObj.cmc_subarea }}/天
          </div>
          <div class="td_li">{{ detailObj.administrative_fee }}%</div>
          <div class="td_li" v-if="detailObj.cmc_subarea != 'XCH'">
            {{ detailObj.Back_tothe }}天
          </div>
          <div class="td_li" v-else>{{ detailObj.end_sale_time }}</div>
        </div>
        <div class="th">
          总价 ￥{{ detailObj.activity_price * quantity }} （不包含电费）
        </div>

        <div class="number flex-between align-center">
          <div
            class="pre"
            @click="quantity == 1 ? '' : quantity--"
            :style="quantity == 1 ? 'color:#999' : 'color:#000'"
          >
            -
          </div>
          <div class="num">{{ quantity }}</div>
          <div class="plus" @click="quantity++">+</div>
        </div>

        <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
        <span class="span" @click="handleAgreement">矿机租赁/购买协议</span>
        <div class="btn1" v-if="flag == true">已结束</div>
        <div class="btn" @click="navigate('./order')" v-else>购买</div>
      </div>
    </div>
    <div class="content margin0">
      <div class="titleBox">
        <div class="title">市场热销</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="text" v-html="detailObj.description"></div>
    </div>

    <el-dialog :visible.sync="agreementVisible">
      <div class="tipConetnt">
        <div class="title text-center">
          矿机／算力租赁（购买）、委托管理服务协议
        </div>
        <div class="txt">尊敬的用户朋友：</div>
        <div class="text">
          灰度云矿（以下简称我们）致力于挖矿即服务的信条，使用最新技术提供多算法、多币种的云挖矿服务。通过将矿机／算力出售／租赁给客户，并同步提供矿机／算力委托管理和挖矿维护业务，为客户提供不同规模的加密数字货币挖矿能力的一站式解决方案。
        </div>
        <div class="text">
          以下为我们的服务条款，通过您在我们网站平台的操作，我们将共同受到服务条款的约束，通过服务条款建立法律上的权利义务关系。请您先仔细阅读本服务条款内容，充分理解本协议及各条款，尤其是字体加粗部分。如果您对本合约内容有任何疑问，请勿进行下一步操作。
        </div>
        <div class="text">
          您使用平台服务、通过网络页面确认或以其他方式接受本协议，即视为您已充分理解本协议所有条款，并同意与我们订立本协议。
        </div>
        <div class="text">
          如您在同意订立本协议之前，对本协议内容存在疑虑或异议，请您联系我们，以便我们为您进行解释和说明，使您能够充分理解，从而帮助您自主决定是否接受本协议及是否使用我们的服务。
        </div>

        <div class="text">
          根据《中华人民共和国合同法》等有关法律、法规的规定，经双方平等、自愿协商，特就客户向灰度云矿租赁（购买）矿机／算力并委托灰度云矿提供托管服务事宜，达成以下一致条款，以供双方共同遵照执行：
        </div>

        <div class="h4">一、矿机的租赁（购买）</div>
        <div class="text">
          1.1灰度云矿向您提供租赁（购买）委托管理服务的矿机／算力信息见关联订单。
        </div>

        <div class="text">
          1.2
          租赁或者购买矿机／算力：灰度云矿向用户提供本协议所附带订单内指定型号和数量的矿机／算力，用户可以选择租赁或或购买的方式来取得矿机／算力在本协议期限内的使用权或者所有权；
        </div>
        <div class="text">
          但无论采用租赁方式还是购买的方式，用户均应同步委托灰度云矿对矿机进行委托管理，以便于实现用户算力的最大化，最大限度保障用户的权益；若用户以购买方式委托灰度云矿对矿机管理一年以上，用户有权在提前书面通知灰度云矿的情况下（一般为提前30日通知，以使得灰度云矿有充分的准备时间），解除矿机的委托管理服务，并自行安排运输将矿机提货至用户预先准备的地址。
        </div>

        <div class="h4">二、矿机委托管理服务内容</div>
        <div class="text">
          2.1场地配套服务：灰度云矿为租赁或购买矿机的用户提供主机场地、电力配套、宽带网络配套、安全监控及主机管理和故障的排查并协助甲方或厂家进行维修等托管服务。
        </div>

        <div class="text">
          2.2日常监控服务：灰度云矿进行日常监控，以保证用户租赁或购买并委托管理的矿机平稳运行。
        </div>

        <div class="text">
          2.3
          网络与信息安全保障：灰度云矿有按要求配合国家有关部门处理互联网络与信息安全工作的义务。
        </div>

        <div class="text">
          2.4
          矿机的安全和赔偿：灰度云矿应保证甲方委托管理的设备的安全，保证不丢失、不被破坏。如果产生丢失、破坏的情况，乙方应照价赔偿甲方设备。
        </div>

        <div class="text">
          2.5
          矿机的运输：对于用户购买的矿机，灰度云矿负责国内发往国外之间的运输、物流以及运输过程的中保险保价，运费按实际发生金额向用户收取，但灰度云矿选择运输、保险之前应提前通知用户和用户确定选择何种运输方式和投保哪种类型的保险及其他相关事宜，以保障用户的前述费用负担在合理的市场价格范围内（注意该运输的约定不适用于购买矿机用户的自提矿机）。
        </div>

        <div class="h4">三、收益结算：</div>
        <div class="text">
          3.1
          当前所选产品的挖矿收益采取日结方式结算，挖矿收益为实际算力所得收益扣除电费，扣除运营维护费后所得，灰度云矿将在每个挖矿日结束后24小时内发放当日收益到用户账户。
        </div>
        <div class="text">
          3.2
          丰水期与枯水期涉及到矿机流转，预计每年将有30天的停机转场期。矿机停机期间，矿机不扣电费，没有收益。加速挖矿产品将在用户回本后重新分配挖矿收入：
        </div>
        <div class="text">回本前：</div>
        <div class="text">用户：100%挖矿收入；平台：0%</div>
        <div class="text">回本后：</div>
        <div class="text">用户：85%挖矿收入；平台：15%</div>
        <div class="h4">四、租赁和委托管理的期限</div>
        <div class="text">
          4.1
          无论采取租赁或者购买的方式，用户委托管理的矿机，其运行期限为：约定租赁时长或12个月（自用户支付租赁或购买费用时起算，本网站会另行书面通知用户起算期限）。用户不承担运维费用。
        </div>
        <div class="text">
          4.2
          若用户采取购买方式，且委托管理的矿机运行时长超过1年，则用户有权在第一个委托管理周期届满前提前30日书面通知灰度云矿，以解除灰度云矿的托管授权，灰度云矿可与用户协商在适当时间停止矿机的运行，并配合客户对矿机的运输工作。但灰度云矿自矿机交付用户指定的第一承运人时不再承担矿机的任何管理责任，尤其是矿机自身的安全责任和自身损坏赔偿责任及对任何第三方造成损害的赔偿责任。
        </div>

        <div class="text">
          4.3
          若用户在协议“4.2条”的情况下，在委托管理期限届满后超过90还未提货的，则灰度云矿有权收取一定的保管费用。
        </div>
        <div class="h4">五、服务终止条款：</div>
        <div class="text">满足以下条款之一，服务即自动终止。</div>
        <div class="text">
          5.1
          若挖矿收益不足以抵扣电费，灰度云矿将暂时关闭受影响的矿机，并按用户预留的联系方式通知用户充缴；若停机90天仍不满足开机条件，将下架矿机并联系用户处理，用户将获得60天处理期以充缴电费重新开机；若逾期或无法取得联系，将视为用户放弃矿机且服务自动终止。
        </div>
        <div class="text">
          5.2
          由于发生不能预见、不能避免或不能克服的客观事件造成的损失，导致矿场无法继续运营时，服务将提前终止，灰度云矿不对此承担赔偿责任。
        </div>
        <div class="text">
          5.3
          丰水期枯水期转换时将产生矿机转场期，转场期间不收取电费且不产生挖矿收入，每次转场期预计为15天，受不可控因素影响或适当延长。
        </div>
        <div class="text">
          5.4
          丰水期或发生电力不稳定情况，将可能临时停机或算力下线，停机时不收取电费且不产生挖矿收入，损益累计月结。
        </div>
        <div class="h4">六、费用负担</div>
        <div class="text">
          用户需要向灰度云矿支付的费用有年度矿机租赁费，矿机永久购买费用、委托管理费用和基础电费等；请注意，下单并支付成功后，订单将无法撤销和退款。特殊产品类别将在购买页面公示收费项目及方式，请仔细阅读购买页面产品详情。以充分理解费用负担。
        </div>
        <div class="h4">七、用户和灰度云矿的权利义务关系</div>
        <div class="text">
          7.1
          用户需要知悉：灰度云矿并非一个矿机的销售商，用户如果采用购买矿机的方式，矿机的所有权通过占有改定的方式转移，但用户必须同时使用灰度云矿的委托管理服务一年以上才能够拥有矿机的占有和处分权能。
        </div>
        <div class="text">
          7.2
          用户如果在主机上安装软件，所需要的软件版权／许可／使用权由灰度云矿帮助提供；非双方另有书面约定，客户承认灰度云矿向甲方提供的任何资料、软件、数据等的权利属于灰度云矿，用户无权复制、传播、转让、许可或提供他人使用这些资源，否则应承担相应的责任。
        </div>
        <div class="text">
          7.3
          灰度云矿向用户提供购买矿机的保修服务，其保修期限、范围等条款受生产商三包服务约束，所购产品保修期为自产品验收合格之日起。若甲方超过本合同约定期限未验收或提出异议的，则自产品到达甲方指定收货地点第25小时起算180日为保修期。
        </div>
        <div class="text">
          7.4
          用户和灰度云矿均应严格履行本协议的各项约定，任何一方违约的，则守约方有权向违约方发送书面通知，违约方应自收到书面通知后7个工作日内向守约方书面说明理由，若未在约定期限说明理由，又未予以更正的，则作为客户的守约方有权采取举报、诉讼或仲裁等救济措施，灰度云矿则有权采取其他合法技术措施以实现自力救济，但保留通过诉讼、仲裁方式维护自身权益的权利。
        </div>
        <div class="h4">八、关于用户算力最大化的法律声明</div>
        <div class="text">
          灰度云矿致力于为用户提供一站式数字货币算力解决方案，但数字货币算力带来的收益，受到对应数字货币市场总算力状况，某一时段的数字货币挖矿分配方案、对应币值波动等多个方面的影响，而这些都是不可预测的。每个客户都必须就购买或租赁矿机／算力带来的收益作出独立判断，并应在选择是否购买或租赁矿机／算力时考虑风险和自身情况。灰度云矿不承诺收益，且不对客户挖矿收益承担责任。
        </div>
        <div class="h4">九、协议变更、解除、终止和权利义务的转让</div>
        <div class="text">
          9.1
          协议变更:灰度云矿保留根据市场的需要，不定期修改交易方式、托管时长等协议内容的权利，如果根据诚实信用原则是被认为合理的或必要的。
        </div>
        <div class="text">9.2 协议解除与终止</div>
        <div class="text">
          9.2.1
          您在使用平台服务的过程中，如果有下列情形发生，我们可以单方面解除本协议：
        </div>
        <div class="text">9.2.2 您的账户因任何原因注销的；</div>
        <div class="text">9.2.3冒用他人名义、盗用他人账户使用平台服务的；</div>
        <div class="text">9.2.4 为非法目的使用平台服务的；</div>
        <div class="text">9.2.5从事任何可能侵害平台系统、资料之行为；</div>
        <div class="text">9.2.6违反任何法律法规、本协议约定的；</div>
        <div class="text">
          9.2.7监管机构认为平台提供的服务不再符合相关监管规定的；
        </div>
        <div class="text">
          9.2.8除上述原因外，我们可以根据风险及自身业务运营情况需要终止向您提供某些服务，届时公司将会视情况公告或告知。鉴于这属于正常商业决策行为，如因此导致您无法使用平台服务服务受到限制的，您理解我们无须对此承担责任。
        </div>
        <div class="text">
          9.3
          权利义务的转让我们可以基于平台服务的需要，变更或增加履约主体，如您继续使用平台服务的，视为同意变更后的主体或新增的主体作为与您履约的相对方。
        </div>
        <div class="h4">十、争议的解决</div>
        <div class="text">
          本协议的订立、效力、解释、履行及争议的解决均适用中华人民共和国法律。在协议履行期间，凡由本协议引起的或与本协议有关的一切争议、纠纷，当事人应首先协商解决。协商不成，各方一致同意提交被告方所在地人民法院通过诉讼方式解决。
        </div>
        <div class="h4">十一、通知</div>
        <div class="text">
          本协议履行过程中，我们向您发出的书面通知方式包括邮寄纸质通知、灰度云矿网站公告、电子邮件、机短信和传真等方式。
        </div>
        <div class="h4">十二、其他</div>
        <div class="text">
          12.1本协议的附件及各项补充、修订或变更，为本协议不可分割的组成部分，与本协议正文具有同等法律效力。
        </div>
        <div class="text">
          12.2 本协议各方应按法律法规及相关规定各自承担与本协议相关的税费。
        </div>
        <div class="text">
          12.3
          本协议未尽事宜，由双方协商处理，或者按国家有关法律、法规的规定执行。
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      id: "",
      detailObj: {},
      quantity: 1,
      time: "",
      flag: false,
      agreementVisible: false,
      picImage: "",
      coin: ""
    };
  },
  created() {
    this.id = this.$route.query.productId;
    this.getDetail(this.id);
  },
  //   watch: {
  //     $route(to, from) {
  //       this.id = this.$route.query.productId;
  //       //   this.getDetail();
  //     }
  //   },
  methods: {
    // 协议
    handleAgreement() {
      this.agreementVisible = true;
    },

    navigate(path) {
      this.$router.push({
        path: path,
        query: {
          quantity: this.quantity,
          id: this.id,
          coin: this.coin
        }
      });
    },
    getDetail(id) {
      let param = new URLSearchParams();
      param.append("productId", id);
      this.$axios.post("/MartianOrePool/selectMillAllById", param).then(res => {
        let result = res.data;
        let obj = res.data.data[0];
        this.coin = obj.cmc_subarea;
        this.picImage = obj.image;
        var nowTime = Date.parse(new Date()) / 1000;
        this.time = result.data[0].parseTime - nowTime;
        if (this.time <= 0) {
          // 过会改为true
          this.flag = true;
          // this.text == "已结束";
        } else {
          this.flag = false;
          // this.text == "购买";
        }
        if (result.state == 0) {
          this.detailObj = result.data[0];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 1200px;
  padding: 100px 0 0 30px;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  .name {
    font-size: 30px;
    font-weight: 700;
    color: #000000;
  }
  .countDown {
    margin: 30px 0 120px 0;
  }
  .border {
    width: 40px;
    height: 40px;
    border: 1px solid #ffab57;
    border-radius: 5px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 700;
    color: #ffab57;
    text-align: center;
  }
  span {
    color: #989898;
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
  }
  .pic {
    width: 320px;
    height: 220px;
    margin-top: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 40px;
    .starTime {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999;
    }
    .th {
      width: 100%;
      margin-top: 50px;
      font-size: 20px;
      font-weight: bold;
      color: #000000;
      .th_li {
        width: 33.333333%;
      }
    }
    .td {
      width: 100%;
      margin-top: 10px;
      font-size: 20px;
      color: #999;
      .td_li {
        width: 33.333333%;
      }
    }
    .number {
      width: 100%;
      height: 75px;
      background: rgba(0, 0, 0, 0.05);
      margin-top: 20px;
      padding: 0 20px;
      .pre,
      .plus {
        color: #000;
        font-size: 48px;
        cursor: pointer;
      }
      .num {
        color: #000;
        font-size: 36px;
      }
    }
    .span {
      color: #f16c00;
      font-size: 14px;
    }
    .el-checkbox {
      margin-top: 20px;
    }
    .btn {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: linear-gradient(180deg, #ff9b48, #ffc99b);
      margin: 80px auto;
      text-align: center;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
    .btn1 {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: linear-gradient(180deg, #b6b6b6, #929292);
      margin: 80px auto;
      text-align: center;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
.content {
  width: 1200px;
  padding-bottom: 100px;
  .titleBox {
    width: 180px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 38px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .text {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    line-height: 36px;
    padding: 30px 0;
  }
}
.el-dialog__body {
  .tipConetnt {
    width: 100%;
    margin: 0 auto;
    padding: 0px 0 100px;
  }
  .title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    // color: #f16c00;
    color: #000;
    height: 82px;
    line-height: 82px;
  }
  .txt {
    padding: 20px;
    color: #666;
    font-size: 18px;
  }
  .text {
    padding: 0 20px;
    color: #666;
    font-size: 18px;
    text-indent: 2em;
  }
  .h4 {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
  }
}

@media screen and (max-width: 767px) {
  .banner {
    width: 100%;
    padding: 0px 0 0 15px;
    display: flex;
    flex-direction: column;
    .name {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      margin-top: 18px;
      color: #000000;
    }
    .countDown {
      margin: 15px 0 60px 0;
    }
    .border {
      width: 20px;
      height: 20px;
      border: 1px solid #ffab57;
      border-radius: 5px;
      line-height: 20px;
      font-size: 12px;
      font-weight: 700;
      color: #ffab57;
      text-align: center;
    }
    span {
      color: #989898;
      font-size: 12px;
      padding: 0 5px;
      cursor: pointer;
    }
    .pic {
      width: 160px;
      height: 110px;
      margin: 30px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
      .starTime {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999;
      }
      .th {
        width: 100%;
        margin-top: 25px;
        font-size: 10px;
        font-weight: bold;
        color: #000000;
        .th_li {
          width: 33.333333%;
        }
      }
      .td {
        width: 100%;
        margin-top: 5px;
        font-size: 12px;
        color: #999;
        .td_li {
          width: 33.333333%;
        }
      }
      .number {
        width: 90%;
        height: 35px;
        background: rgba(0, 0, 0, 0.05);
        margin-top: 10px;
        padding: 0 10px;
        .pre,
        .plus {
          color: #000;
          font-size: 24px;
          cursor: pointer;
        }
        .num {
          color: #000;
          font-size: 18px;
        }
      }
      .span {
        color: #f16c00;
        font-size: 12px;
      }
      .el-checkbox {
        margin-top: 10px;
      }
      .btn {
        width: 250px;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(180deg, #ff9b48, #ffc99b);
        margin: 40px auto;
        text-align: center;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
      }
      .btn1 {
        width: 250px;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(180deg, #b6b6b6, #929292);
        margin: 40px 25px;
        text-align: center;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
  .content {
    width: 100%;
    padding-bottom: 50px;
    .titleBox {
      width: 90px;
      height: 25px;
      position: relative;
      .title {
        color: #815ff5;
        font-size: 18px;
        margin-left: 5px;
      }
      .title_bg {
        width: 75px;
        height: 16px;
        position: absolute;
        right: -5px;
        bottom: -5px;
      }
    }
    .text {
      font-size: 12px;
      font-weight: 400;
      color: #000000;
      line-height: 18px;
      padding: 15px 10px;
    }
  }
  .el-dialog__body {
    .tipConetnt {
      width: 100%;
      margin: 0 auto;
      padding: 0px 0 10px;
    }
    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      // color: #f16c00;
      color: #000;
      line-height: 40px;
    }
    .txt {
      padding: 10px;
      color: #666;
      font-size: 14px;
    }
    .text {
      padding: 0 10px;
      color: #666;
      font-size: 14px;
      text-indent: 2em;
    }
    .h4 {
      color: #000;
      font-size: 16px;
      font-weight: 600;
      padding: 10px;
    }
  }
}
</style>

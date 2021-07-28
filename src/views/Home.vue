<template>
  <div class="home">
    <video id="homeVideo" ref="homeVideo" webkit-playsinline="" playsinline="true" :src="videoSrc" controls autoplay loop preload width="100%" x5-video-player-fullscreen='true' x5-video-player-orientation="landscape"></video>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      videoSrc:
        "https://oos-fj2.ctyunapi.cn/lilanz/qrcodeVideo/20210727/zs.mp4",
      wxinfo: [],
    };
  },
  mounted() {
    this.$utils.showToast("请稍等...", { type: "loading" });
    this.init();
    this.getWx();
  },
  methods: {
    getWx() {
      this.$api
        .getWxInfo({
          action: "getWXJSsignature",
          parameter: {
            configkey: 5,
            url: window.location.href.replace("\/#", ""), //("\/#", "")要写这样的，不然会出错
          },
        })
        .then((res) => {
          if (res.errcode != 0) {
            console.log("界面出现错误不允许分享，可刷新重试");
            return;
          }
          this.wxinfo = res.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this.wxinfo[0], // 必填，公众号的唯一标识，填自己的！
            timestamp: this.wxinfo[1], // 必填，生成签名的时间戳，刚才接口拿到的数据
            nonceStr: this.wxinfo[2], // 必填，生成签名的随机串
            signature: this.wxinfo[3], // 必填，签名，见附录1
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "showMenuItems",
              "updateAppMessageShareData",
            ], // 必填，需要使用的JS接口列表。
          });
          wx.ready(() => {
            //需在用户可能点击分享按钮前就先调用
            wx.onMenuShareTimeline({
              //配置去分享朋友圈的选项
              title: "LILANZ", //分享标题
              link: window.location.href.replace("\/#", ""), //分享链接
              imgUrl: "http://tm.lilanz.com/QYWX/Test/LMTest/assets/img/lilanzLogo/lilanz.png", //分享图标
              success: function (res) {
              },
              cancel: function () {
                //that.alert="失败弹框话术等等(注意 这里拿不到this实例的)"
              },
            });
            // 好友
            wx.updateAppMessageShareData({
              title: "LILANZ", // 分享标题
              desc: `\r\n利郎总部创意园\r\n福建晋江市长兴路200号`, // 分享描述
              link: window.location.href.replace("\/#", ""), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "http://tm.lilanz.com/QYWX/Test/LMTest/assets/img/lilanzLogo/lilanz.png", // 分享图标
              success: function () {},
            });
            wx.error(function (res) {
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    init() {
      this.$nextTick(() => {
        let homeVideo = document.getElementById("homeVideo");
        homeVideo.play();
        // 微信
        document.addEventListener(
          "WeixinJSBridgeReady",
          function () {
            document.getElementById("homeVideo").play();
          },
          false
        );
        // 安卓
        document.addEventListener(
          "touchstart",
          function () {
            document.getElementById("homeVideo").play();
          },
          false
        );
        this.$toast.clear();
      });
    },
  },
};
</script>


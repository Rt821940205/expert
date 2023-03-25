<script>
import Vue from "vue";
let id = "OkwQ9uydfiCQHgf70n";
let host = "http://172.16.13.156/h5";
let sso = "https://oauth.zjut.edu.cn";
var getUrlParams = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    r[2] = r[2].replace(new RegExp("%", "g"), "%25");
    return decodeURI(decodeURIComponent(r[2]));
  }
  return "";
};
export default {
  data() {
    return {
      code: "",
      options: {},
    };
  },
  onLaunch: function () {
    // Vue.prototype.windowTo = this.windowTo;
    // this.code = getUrlParams("code") || this.$store.state.home.accessToken;
    // this.options.code = code;
    // this.windowTo();
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    windowTo() {
      const href =
        sso +
        `/cas/oauth2.0/authorize?response_type=code&client_id=${id}&redirect_uri=${host}`;
      window.location.href = href;
    },
    getaccess_token(code) {
      var url = `http://172.16.13.156/kjdnphp/public/casAuth?code=${code}`;
      uni.request({
        url: url,
        success: (res) => {
          var data = res.data.data;
          try {
            data = JSON.parse(data);
          } catch (error) {
            data = {};
          }
          let access_token = data.access_token;
          let expires_in = data.expires_in;
          this.$store.dispatch("setAccessToken", access_token);
          const token = this.$store.state.home.accessToken;
          if (access_token && expires_in > 0) {
            this.getUserId();
          } else {
          }
        },
      });
    },
    getUserId() {
      let token = this.$store.state.home.accessToken;
      var url = `http://172.16.13.156/kjdnphp/public/casLastStep?token=${token}`;
      uni.request({
        url: url,
        success: (res) => {
          var data = res.data.data;
          try {
            data = JSON.parse(data);
          } catch (error) {
            data = {};
          }
          let id = data.id;
          this.$store.dispatch("setSnNo", id);
          uni.$emit("update");
        },
      });
    },
  },
};
</script>

<style>
/*每个页面公共css */
@import url(/static/home/iconfont.css);
scroll-view ::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
</style>

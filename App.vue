<script>
import Vue from "vue";
let id = "OkwQ9uydfiCQHgf70n";
let secret = "635c0c03f2e84c2c946b589095083b4d";
let sso = "https://oauth.zjut.edu.cn";
let host = "http://172.16.13.156/h5";
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
    //生产环境不要打开
    // this.$store.dispatch('setAccessToken', 'VEdULTE4NDc5MS1iQnNjeFZHQVV6ZlJsdDZqaFVmZHFqOUJXY3Vacmptd09kSUJDSXFrcm5rN2ZMNnNPQy16ZnNvZnQuY29tIzMz')
    // this.$store.dispatch('setSnNo', '04284')
    Vue.prototype.windowTo = this.windowTo;
    let _this = this;
    let options = (_this.options = _this.$route.query);
    let code = (this.code =
      getUrlParams("code") || this.$store.state.home.accessToken);
    let admin = (this.code = getUrlParams("admin") || options.admin);
    this.options.code = code;
    // console.log(this.$store.state.home.accessToken)
    // console.log('App Launch', code, new Date() * 1)
    // if (!admin) {
    // 	if (this.$store.state.home.accessToken === '') {
    // 		if (!options.code) {
    // 			this.windowTo()
    // 		} else {
    // 			try {
    // 				this.getaccess_token(code)
    // 			} catch (error) {
    // 				this.windowTo()
    // 			}
    // 		}
    // 	} else {
    // 		//调用最后一步 获取数据
    // 		this.getUserId()
    // 	}

    // } else {
    // 	this.getaccess_token('112132')

    // }
  },
  onShow: function () {
    // console.log('App Show')
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    windowTo() {
      console.log("跳转啊!");
      window.location.href =
        sso +
        `/cas/oauth2.0/authorize?response_type=code&client_id=${id}&redirect_uri=${host}`;
    },
    getaccess_token(code) {
      var url = `http://172.16.13.156/kjdnphp/public/casAuth?code=${code}`;
      uni.request({
        url: url,
        success: (res) => {
          //{"code":1,"totel":1,"msg":"\u83b7\u53d6\u6570\u636e\u6210\u529f\uff01","data":"{\"access_token\":\"VEdULTE1MTg3Ni1ZRFVJQkxTVm5qTTNqekwxSWFXb1lKWDNhYllmQWhYRWpjTkRLYkJzYmpmSXlta0d0MC16ZnNvZnQuY29tIzMz\",\"expires_in\":7051}"}
          console.log(res.data);
          var data = res.data.data;
          try {
            data = JSON.parse(data);
          } catch (error) {
            data = {};
          }
          let access_token = data.access_token;
          let expires_in = data.expires_in;
          console.log("access_token", access_token);
          console.log("expires_in", expires_in);
          this.$store.dispatch("setAccessToken", access_token);
          const token = this.$store.state.home.accessToken;
          console.log("缓存内的access_token:", token);
          if (access_token && expires_in > 0) {
            //调用最后一步 获取数据
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
          console.log("用户ID是", id);
          this.$store.dispatch("setSnNo", id);
          const snNo = this.$store.state.home.snNo;
          console.log("缓存内的snNo:", snNo);
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

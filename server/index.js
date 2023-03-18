import request from "@/utils/http/httpload.js";
/* 测试Api */
export default {
  // get请求 可以拼接url或者传入数据对象 二选一
  // 获取仪器列表
  getList(data) {
    // 传入的data对象  {ip:'121.00.00.01'};
    return request.get("/api/instrument/list", {
      params: data,
    });
  },
  // post请求
  // 获取仪器详情
  getDetails(data) {
    // 传入的data对象  {ip:'xxxxxx'};
    return request.post("/api/instrument/getDetails", data);
  },
  // 获取老师列表
  getTeacherList(data) {
    // 传入的data对象  {ip:'xxxxxx'};
    return request.post("/api/wx-user/teacherList", data);
  },
  // 获取班级列表
  getClassList(data) {
    // 传入的data对象  {ip:'xxxxxx'};
    return request.post("/api/wx-user/classList", data);
  },
  // put请求
  putData(data) {
    // 传入的data对象  {ip:'xxxxxx'};
    //put方法大部分会以拼接地址的形式使用 如:request.put("/test/getInfo.php?id="+4)
    return request.put("/ip/getIpInfo.php", data);
  },
  // delete请求
  deleteData(data) {
    // 传入的data对象  {ip:'xxxxxx'};
    //delete方法大部分会以拼接地址的形式使用 如:request.delete("/test/getInfo.php?id="+4)
    return request.delete("/ip/getIpInfo.php", data);
  },

  //搜索相关接口
  //1.获取学校列表
  getCollageList(data) {
    return request.post("/api/wx-user/collageList", data);
  },

  getUserByUserNo(data) {
    return request.post("/getUserByUserNo", data);
  },

  getUserResourceNum(data) {
    return request.post("/getUserResourceNum", data);
  },
  getUserResourcePage(data) {
    return request.post("/getUserResourcePage", data);
  },
  //获取成果详情
  getResourceById(data) {
    return request.post("/getResourceById", data);
  },
  // 我的关注
  getUserBuddyPage(data) {
    return request.post("/getUserBuddyPage", data);
  },
  // 校内学者
  findScholarByUserId(data) {
    return request.post("/findScholarByUserId", data);
  },
  // 关注
  addUserBuddy(data) {
    return request.post("/addUserBuddy", data);
  },
  getUserById(data) {
    return request.post("/getUserById", data);
  },
  delUserBuddyPage(data) {
    return request.post("/delUserBuddyPage", data);
  },
  //成果认领列表
  getNewResourceNumPage(data) {
    return request.post("/getNewResourceNumPage", data);
  },
};

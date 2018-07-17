//index.js
//获取应用实例

/**
* 代称装名称
*/
const tagMap = {
  'gn': '国内',
  'gj': '国际',
  'cj': '财经',
  'yl': '娱乐',
  'js': '军事',
  'ty': '体育',
  'other': '其他'
}
/**
* ID转代称
*/
const idtoTagMap = {
  '0':'gn',
  '1':'gj',
  '2':'cj',
  '3':'yl',
  '4':'js',
  '5':'ty',
  '6':'other'
}
var currentID = ""
var currentResult = [];

Page({
  /**
   * 页面的初始数据
   */
  data:{
    newsList: [{ title: "No content", firstImage: "",date:"",source:"" }],
    discription:"",
    currentTab: 0,
    firstImage:"/image/placeholder.png",
    navbar: ["国内", "国际", "财经", "娱乐", "军事", "体育","其他"],
  },

  /**
   * 获得当前分类的ID
   */
  navbarTap: function (e) {
    var id = e.currentTarget.dataset.idx;
    this.getData(id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    this.getData('0');
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.getData(currentID, () => wx.stopPullDownRefresh())
  },

  /**
   * 从API获取数据
   */
  getData(tagId,callback){
    var tag = idtoTagMap[tagId]
    currentID = tagId
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: tag
      },
      header: {
        'content-type': 'application/json' 
      },
      success: res => {
        var result = res.data.result;
        console.log(result)
        if(result==null){
          this.setList(this.data.newsList);
        }else{
          this.setList(result);
        }
      },

      
      /**
       * 获取数据后，停止下拉
      */
      complete: () => {
        callback && callback()
      }
    })
  },

  /**
   * 绑定数据到UI，通过wx:for显示
   */
  setList(result){
    currentResult = result;
      this.setData({
        newsList:result,
      })

  },

  /**
   * 响应点击时间，导航至详细内容页面
   */
  onViewContent(e){
    var dataId = e.currentTarget.dataset.idx;
    var newsId = currentResult[dataId].id;
    wx.navigateTo({
      url: '/pages/news/news?newsId=' + newsId,
    })
  }
})

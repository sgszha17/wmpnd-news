Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    date:"",
    sourcec:"",
    content:[],
    readCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsID = options.newsId;
      this.getContent(newsID);
  },

  /**
   * 通过新闻ID从API获取想要查看的新闻的详细内容
   */
  getContent(newsID){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail', 
      data: {
        id: newsID
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        var result = res.data.result;
        this.setContent(result);
      },
    })
  },

  /**
   * 把数据绑定到UI
   */
  setContent(result){
    this.setData({
      title: result.title,
      date: result.date,
      source: result.source,
      content: result.content,
      readCount: result.readCount
    })
  }
})
/**
 * Created by DongGe on 2017/6/13.
 */
var https = require('https');

function getHttps(url, req, res, next) {
  https.get(url, function (src) {
    let datas = '';
    src.on('data', function (data) {
      datas += data;
    });
    src.on('end', function () {
      datas = JSON.parse(datas);
      res.json(datas);
    }).on('error', function () {
      res.json({code: -1});
    })
  })
}

exports.getRecom = function (req, res, next) {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1602743645&uin=1973901763&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1497338930280'
  getHttps(url, req, res, next);
};

exports.getTopList = function (req, res, next) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1497448560371';
  getHttps(url, req, res, next);
};

exports.getHotKey = function (req, res, next) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1497534596488';
  getHttps(url, req, res, next);
};

exports.getTopSongList = function (req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.json({code: -1});
    return;
  }
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=' + id + '&_=1497493986298'
  getHttps(url, req, res, next);
};

exports.getSearch = function (req, res, next) {
  let key = req.query.key;
  key = encodeURI(key);
  let url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${key}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1497543802007`;
  getHttps(url, req, res, next);
};



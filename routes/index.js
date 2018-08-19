var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '简单nodejs爬虫'});
});
router.get('/getJobs', function(req, res, next) { // 浏览器端发来get请求
    var page = req.query.filterOption;  //获取get请求中的参数 page
    console.log("filterOption: "+page);
    var Res = res;  //保存，防止下边的修改
//url 获取信息的页面部分地址
    var url2 = 'https://item.jd.com/3133817.html ';
    var url = 'http://www.yibinu.cn/xwzx/xxyw/'+page+'.htm';
    http.get(url,function(res){  //通过get方法获取对应地址中的页面信息
        var chunks = [];
        var size = 0;
        res.on('data',function(chunk){   //监听事件 传输
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end',function(){  //数据传输完
            var data = Buffer.concat(chunks,size);
            var html = data.toString();
            console.log(html);
            var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理
            var jobs = [];

            /*var jobs_list = $(".item_con_list li");*/
            $(".text-list ul>li").each(function(){   //对页面岗位栏信息进行处理  每个岗位对应一个 li  ,各标识符到页面进行分析得出
                var job = {};
                job.title = $(this).find(".title").find("a").html(); //公司名
                job.src = $(this).find(".title").find("a").attr("href");
                job.time = $(this).find(".time").html();

                console.log(job.title);  //控制台输出岗位名
                jobs.push(job);
            });
            Res.json({  //返回json格式数据给浏览器端
                jobs:jobs
            });
        });
    });

});

module.exports = router;
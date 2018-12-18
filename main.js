

var result1=`
/*
*面试官你好
*单独文字的描述可能有些单调
*这是一份动态的简历
*希望能把无聊的阅读变得有趣些
*我们立刻开始
*/

/*先给所有元素加点过度效果*/
*{
transition:all .5s;
}

/*白色的背景有些阴郁，稍稍改变下*/
html{
    background:#282A36;
    font-family:KaiTi;
    font-size:12px;
}

/*太紧凑了，加点边框和边距*/
#content1{
    margin:0.5em;
    padding:0.5em;
    border:1px solid ;
    width:35vw;
    height:90vh;
    overflow:auto;
}

/*再来点3D效果2333*/
html{
    perspective:1000px;
}
#content1{
    position:fixed;
    top:0;
    transform:rotateY(10deg) translateZ(-100px)
}
/**/

/*代码颜色需要高亮下*/
.token.selector{
    color:#50FA7B;
}
.token.property{
    color:#2FB4EF;
}
.token.function{
    color:#FF597C;
}
.token.comment{
    color:white;
}

/*我们需要一张白纸来呈现简历→ →*/
`
var result2=`
#paper{
    width:60vw;
    height:100vh;
    background:white;
    border:1px solid #BD93F9;
    position:fixed;
    right:0;
    top:0;
    margin:0.5em;
    padding:0.5em;
    color:white;
}
`

var result3=`
# 自我介绍
我叫 Driss
一个前端菜鸟工程师，正在努力学习中
# 技术介绍
前端开发
# 工作经历
尚无经验，正陷入hr对经验要求的矛盾漩涡中
# 作品
链接
# 联系我
邮箱:xxx@163.com
`
var result4=`
/*markdown观赏体验太差了
*我需要借助marked.js 插件来把它转成html，稍微装修下
*/
`
var result5=`
#cvContent{
    font-family:'Microsoft YaHei';
    font-size:12px;
}
/*暂时先做到这吧,
*另外这个回调已经成了callback hell 了，也需要时间来改进下
*/
`


writeCode('',result1,()=>{
    cvMaker(()=>{
        writeCode(result1,result2,()=>{
            addCvContent(result3,()=>{
                writeCode(result1+result2,result4,()=>{
                    mdToHtml(result3,()=>{
                        writeCode(result1+result2+result4,result5)
                    })
                })
            })
        })
    })
})

function writeCode(preCode,code,fn){
    var n=0
    var alarmClock=setInterval(function(){
        n+=1
        content1.innerHTML = Prism.highlight(preCode+code.substring(0,n), Prism.languages.css, 'css');
        styleTag.innerHTML= preCode+code.substring(0,n);
        content1.scrollTop=content1.scrollHeight;
        if(n>=code.length){
            window.clearInterval(alarmClock)
           fn.call()
        }
    },1)
}
function cvMaker(fn){
    var paper=document.createElement('div')
    document.body.appendChild(paper)
    paper.id='paper'
    var cvContent=document.createElement('pre')
    cvContent.id='cvContent'
    paper.append(cvContent);
    fn.call()
}
function addCvContent(code,fn){
    var n=0
    var alarmClock=setInterval(function(){
        n+=1
        cvContent.innerHTML = code.substring(0,n)
        cvContent.scrollTop=cvContent.scrollHeight;
        if(n>=code.length){
            window.clearInterval(alarmClock)
            fn.call()
        }
    },1)
}

function mdToHtml(code,fn){
    cvContent.innerHTML = marked(code)
    fn.call()
}

var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});//marked.js基本设置

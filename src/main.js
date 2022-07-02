const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)//把字符串重新变成对象,与JSON.stringify对应
const hashMap =xObject || [
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "B", url: "https://www.baidu.com" }
];

const simplifyUrl=(url)=>{
  return url.replace('https://','') 
  .replace('http://','')//注意用法,直接写上需要变换的value
  .replace('www.','')
  .replace(/\/.*/,'')//删除/开头的内容直到结尾
}//产生一个新的url,原本的url不变
const render=()=>{
    $siteList.find('li:not(.last)').remove()/*清空之前的再重新渲染*/
    hashMap.forEach((node,index) => {
      //创建一个li  
      const $li = $(`<li>
          
          <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
              <svg class="iconpark-icon">
                <use href="#close-small"></use>
              </svg>
              </div>
          </div>
          </li>`).insertBefore($lastLi)
          $li.on('click',()=>{
            window.open(node.url)
          })//代替a标签的作用,适用于里面有小的元素但是监听事件不一致的情况
          $li.on('click','.close',(e)=>{
            e.stopPropagation()//阻止冒泡(X冒泡到li)
            hashMap.splice(index,1)//删除(1个)元素
            render()
          })
      })
}
    render()//第一次渲染
$(".addButton").on("click", () => {
    let url = window.prompt("请问要添加跳转哪个网址狸");
    if (url.indexOf("http") !== 0) {
      url = "https://" + url; //用户输入非http开头的网址
    }
    console.log(url);
    hashMap.push({
      logo:simplifyUrl(url)[0].toUpperCase(),//touppercase,使其大写
      url:url}
      );
        render()//第二次渲染
      });
  
window.onbeforeunload=()=>{
    const string=JSON.stringify(hashMap)//localstorage只能存字符串不能存對象,这里把对象转化成字符串
    localStorage.setItem('x',string)//在本地设置一个x,值就是string
}
$(document).on('keypress',(e)=>{
  const{key}=e//需要理解
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
    }
  }
})

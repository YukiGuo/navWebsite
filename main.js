
const x = JSON.parse(localStorage.getItem('x'))
let hashMap = x || [
    {
        "url": "http://es6.ruanyifeng.com",
        "name": "es6.ruanyifeng.com",
        "logo": "E"
    }, {
        "url": "https://segmentfault.com",
        "name": "segmentfault.com",
        "logo": "S"
    },
    {
        "url": "https://github.com",
        "name": "github.com",
        "logo": "G"
    },
]
const simplifyUrl = (url) => {
    return url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www", "")
        .replace(/\/.*/, '') //正则表达式删除/开头后面所有的内容
}
const $siteList = $('.siteList')
const $lastLi = $('.last')
const render = (node) => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(
            `<li>
           <a href= ${node.url}>
            <div class="siteItem">
                <div class="logo">${node.logo}</div>
                <div class="link">${node.name}</div>
                <div class="close">
                   <svg class="icon" aria-hidden="true">
                       <use xlink:href="#icon-guanbi">
                       </use>
                    </svg>
                </div>
            </div>
            </a>
        </li>`
        ).insertBefore($lastLi)
        $('.close').on("click", (e) => {
            hashMap.splice(index, 1)
            render(hashMap)
            return false
        }

        )
    })
}
render()
$('.addButton').on("click", () => {
    let url = window.prompt("你想添加哪个网页？")
    if (url.indexOf('http') !== 0) {
        url = "https://" + url
    }
    let name = url.slice(8, -4)
    hashMap.push({ "url": url, "name": simplifyUrl(url), "logo": simplifyUrl(url)[0].toUpperCase() })
    render()
})
// window.onbeforeunload = () => {
//     const string = JSON.stringify(hashMap)
//     localStorage.setItem('x', string)
// }
$(document).on('keypress', (e) => {
    const key = e.key//{key}=const
    console.log(key)
    for (let i = 0; i < hashMap.length; i++) {
        if (key === hashMap[i].logo.toLowerCase()) {
            window.open(hashMap[i].url)
        }
    }

})

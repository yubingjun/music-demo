let musicList = []
fetch('./data.json').then(res => res.json()).then(ret =>  {
    console.log(ret)
    musicList = ret
    setMusic()
})


const $ = Selector => document.querySelector(Selector)

const $playingBtn = $('.player .icon-playing')
const $preBtn = $('.player .icon-play-left')
const $nextBtn = $('.player .icon-play-right')
const $title = $('.player .texts h3')
const $author = $('.player .texts p')
const $time = $('.player .time')
const $progress = $('.player .progress')


let index = 0
let clock = null
let audioObject = document.querySelector('#audio')
// audioObject.autoplay = false //不会自动播放
// setMusic()

//封装一个播放音乐函数
function setMusic() {
    let curMusic = musicList[index]
    // console.log(curMusic)
    audioObject.src = curMusic.src
    $author.innerText = curMusic.author
    $title.innerText = curMusic.title
    

    // audioObject.play()
}

//进度条时间函数
function secondToText(second) {
    second = parseInt(second)
    let min = parseInt(second/60)
    let sec = second%60
    //如果是单数秒 需要前面加个0 例如3秒 03秒 这样效果会好看点  三元运算
    sec = sec < 10 ? '0' + sec : '' + sec
    return min + ':' + sec
}

//播放与暂停
$playingBtn.onclick = function() {
  if (this.classList.contains('icon-playing')) {
    this.classList.remove('icon-playing')
    this.classList.add('icon-pause')
    audioObject.play()
    console.log(audioObject.duration)
    console.log(audioObject.currentTime)
    //进度条计时函数
    clock = setInterval(function() {
    let curTime = audioObject.currentTime
    let totalTime = audioObject.duration
    let percent = curTime/totalTime
    $progress.style.width = percent*100 + '%'
    $time.innerText = secondToText(curTime) +' / '+ secondToText(totalTime)

},1000)
  } else {
    this.classList.remove('icon-pause')
    this.classList.add('icon-playing')
    audioObject.pause()
    clearInterval(clock)
  }  
}

//播放下一首歌曲
$nextBtn.onclick = function() {
  index++
  index = index % musicList.length
  curMusic = musicList[index]
  audioObject.src=curMusic.src
  $author.innerText = curMusic.author
  $title.innerText = curMusic.title
  audioObject.play()
}

//播放上一首歌曲
$preBtn.onclick = function() {
  index--
  index = (index+musicList.length) % musicList.length
  curMusic = musicList[index]
  audioObject.src=curMusic.src
  $author.innerText = curMusic.author
  $title.innerText = curMusic.title
  audioObject.play()
}



//实现数据可视化效果
// new Wave().fromElement("audio","canvas1", {type:"shine rings"})
// new Wave().fromElement("audio","canvas2", {type:"shine rings"})
// new Wave().fromElement("audio","canvas3", {type:"shine rings"})


let audioElement = document.querySelector("audio");
let canvasElement = document.querySelector("canvas");
let wave = new Wave(audioElement, canvasElement);
// wave.addAnimation(new wave.animations.Cubes());
wave.addAnimation(new wave.animations.Cubes({
    fillColor: {gradient: ["yellow","orange","red"], rotate: 45},
    //lineWidth: 6,
    lineColor: "#fff"
}));
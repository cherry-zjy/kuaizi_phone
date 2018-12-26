<template>
  <div class="share-img">
    <div class="img-box" id="imgQr">
      <div>
        <div v-show="imgHide" ref="canvasImg" class="canvasImg">
          <canvas id="goodsImgCanvas"></canvas>
        </div>
        <img v-show="!imgHide" class="goods-img" :src="goodsImg" alt>
        <span class="price">￥{{goodsPrice}}</span>
      </div>
      <div style="line-height:0.6rem;font-size:0.3rem">{{goodsTitle}}</div>
      <div>
        <div id="qrcode" style="text-align:center">
          <!-- <img class="logo" src="../../../static/images/logo.png" alt> -->
        </div>
        <span class="tip">长按识别二维码</span>
      </div>
    </div>
    <div class="footer" @click="downImg()">点击保存分享图片</div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
export default {
  props: ['goodsImg', 'goodsTitle', 'goodsPrice', 'shareUrl'],
  data () {
    return {
      popupShare: false,
      imgHide: false,
      userCode: null
    }
  },
  components: {},
  methods: {
    qrcode (qn) {
      /* eslint-disable no-new */
      new QRCode('qrcode', {
        width: 80,
        height: 80,
        text: qn
      })
    },
    downImg () {
      var _this = this
      this.$emit('clickOnShare', true)
      var canvas2 = document.createElement('canvas')
      let _canvas = document.querySelector('.img-box')
      var w = parseInt(window.getComputedStyle(_canvas).width)
      var h = parseInt(window.getComputedStyle(_canvas).height)
      // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w * 2
      canvas2.height = h * 2
      canvas2.style.width = w / 2 + 'px'
      canvas2.style.height = h / 2 + 'px'
      // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
      var context = canvas2.getContext('2d')
      context.scale(2, 2)
      let opts = {
        scale: 2,
        allowTaint: true,
        canvas: canvas2,
        logging: true,
        imageTimeout: 0,
        background: '#fff',
        // width: w, // dom 原始宽度
        // height: h,
        dpi: window.devicePixelRatio * 960
      }
      var rect = _canvas.getBoundingClientRect() // 获取元素相对于视察的偏移量
      console.log(rect)
      console.dir(_canvas)
      var browser = {
        versions: (function () {
          var u = navigator.userAgent
          return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
          }
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      }
      if (browser.versions.android) {
        // context.translate(-rect.left, -rect.left)
        context.translate(-50, 0)
      } else {
        // context.translate(-rect.left, -rect.left / 2)
        context.translate(0, 0)
      }
      // context.translate(0, 0)
      // 【重要】关闭抗锯齿
      context.mozImageSmoothingEnabled = false
      context.webkitImageSmoothingEnabled = false
      context.msImageSmoothingEnabled = false
      context.imageSmoothingEnabled = false
      html2canvas(document.querySelector('.img-box'), opts).then(function (
        canvas
      ) {
        document.querySelector('.share-img').innerHTML =
          '<div class="qrimg"><p style="font-size:0.4rem;color:#808080;line-height:1.173rem">长按上图进行分享操作</p></div>'
        // document.querySelector('.share-img').innerHTML = '<div class="qrimg"></div>'
        // 在p标签前面插入图片insertBefore(new,item[0]) 在父元素最后插入appendChild(new)
        document
          .querySelector('.qrimg')
          .insertBefore(
            _this.convertCanvasToImage(canvas),
            document.querySelector('.share-img p')
          )
        // document.querySelector('.qrimg').appendChild(_this.convertCanvasToImage(canvas))
        document.querySelector('.qrimg img').style.width = '100%'
      })
    },
    // 从 canvas 提取图片 image
    convertCanvasToImage (canvas) {
      var image = new Image()
      image.src = canvas.toDataURL('image/png')
      return image
    }
  },
  beforeMount () {
    this.userCode = localStorage.getItem('InviteCode')
      ? localStorage.getItem('InviteCode')
      : null
  },
  mounted () {
    // http://jmjwx.kimijia.com/?from=singlemessage&isappinstalled=0#/nomalgoods/goodsdetail/2/23640b2e-06e3-e811-8f41-dcbe8bc6b61e?token=0
    // 通过微信分享打开会携带上?from=singlemessage&isappinstalled=0 和?token=0  生成二维码时需要去掉
    if (
      this.shareUrl.indexOf('from=') > 0 ||
      this.shareUrl.indexOf('code') > 0
    ) {
      this.shareUrl =
        'http://jmjwx.kimijia.com/#' +
        this.shareUrl.split('#')[1].split('?')[0]
      this.qrcode(this.shareUrl + '?code=' + this.userCode)
    } else {
      this.qrcode(this.shareUrl + '?code=' + this.userCode)
    }
  }
}
</script>
<style scoped lang='scss'>
.share {
  height: 13.47rem;
  width: 100%;
  text-align: center;
  position: relative;

  .over {
    position: absolute;
    top: -0.165rem;
    right: 0;
    width: 0.5rem;
  }

  h2 {
    font-size: 0.43rem;
    color: #262626;
    line-height: 1rem;
  }

  p {
    color: #808080;
    font-size: 0.346rem;
    line-height: 0.6rem;
  }

  .img-box {
    width: 6rem;
    margin-top: 0.2rem;
    display: inline-block;
    overflow: hidden;
    div {
      position: relative;
      color: #262626;
      font-size: 0.4rem;

      .goods-img {
        width: 100%;
        height: 100%;
        padding: 0.265rem;
        border: 1px solid #efefef;
      }
      #goodsImgCanvas {
        width: 6rem;
        min-height: 5.8rem;
        border: 1px solid #efefef;
      }

      .price {
        position: absolute;
        right: 0.265rem;
        bottom: 0.365rem;
        font-size: 0.346rem;
        letter-spacing: 0.065rem;
        padding: 0.065rem 0.265rem;
        background-color: #a09c9d;
        opacity: 0.8;
        border-radius: 5px;
        color: #fff;
      }

      .code-img {
        width: 40%;
      }

      .tip {
        color: #808080;
        font-size: 0.32rem;
      }
    }
  }

  .footer {
    width: 100%;
    padding: 0 0.265rem;
    // position: absolute;
    // bottom: 0;
    font-size: 0.4rem;
    height: 1.1733rem;
    line-height: 1.1733rem;
    border: 1px solid #ccc;
    color: #333333;
    text-align: center;
  }
}
</style>

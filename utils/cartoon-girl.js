    L2Dwidget.init({
      "model": {
        //jsonpath控制显示那个小萝莉模型，
        //(切换模型需要改动)path
        // jsonPath: "https://unpkg.com/live2d-widget-model-koharu@latest/assets/koharu.model.json",
        // jsonPath: "https://unpkg.com/live2d-widget-model-haruto@latest/assets/haruto.model.json",
        jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json",
        // jsonPath: "https://unpkg.com/live2d-widget-model-tia@latest/assets/tia.model.json",
        "scale": 1
      },
      "display": {
        "position": "right", //看板娘的表现位置
        // "width": 70,  //小萝莉的宽度
        // "height": 140, //小萝莉的高度
        "width": 200,  //小萝莉的宽度
        "height": 400, //小萝莉的高度
        "hOffset": 35,
        "vOffset": -20
      },
      "mobile": {
        "show": true,
        "scale": 0.5
      },
      "react": {
        "opacityDefault": 0.7,
        "opacityOnHover": 0.2
      }
      ,"dialog": { // not effective
            "enable": true,
            "script": {
                'tap body': '哎呀！别碰我！',
                'tap face': '人家是在认真写博客哦',
            }
          }
    });
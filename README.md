
# PopupWidgetQ

Vue.js popup widget

## Getting started

### Installation

1. Install:

```bash
npm install popup-widget-q

```

2. Add to project globally (main.js):

```vue
import PopupWidget from 'popup-widget-q'

Vue.use(PopupWidget)

```

Add locally to the component:

```vue
import { PopupWidget } from 'popup-widget-q'

export default {
  components: {
    PopupWidget
  }
}

```


### Use SliderQ

```vue
<template>
  <popup-widget
    :iconPath="widgetIconPath"
    :defaultMode='`expanded`'
    :autoexpand='false'
    :autoexpandMs='2000'
    :closeByEsc='true'
    :widgetColor="`#FFB500`"
    :position="{
        bottom: position.bottom,
        right: position.right,
    }"
    :stopAutoexpand="!autoexpandNewsletterModal"
    @onMinimized="onMinimized"
    :showDelayMs='8000' >

  </popup-widget>
</template>

```
### Available Props

|Prop            |Type |Default |Description|
|----------------|==-----|---------|------------|
|`defaultMode`   |String |null     |default mode to pop up. Can be 'minimized' or 'expanded'|
|`text`          |String |null     |text content for expanded modal if no slot provided|
|`title`         |String |null     |title for expanded modal if no slot provided|
|`iconPath`      |String |null     |url for mimnimized widget icon|
|`iconText`      |String |'🎁'     |text showing on minimized widget if no icon path provided|
|`autoexpand`    |Boolean|false    |true/false autoexpand after autoexpandMs|
|`autoexpandMs`  |Number |7000     |ms to autoexpand|
|`closeByEsc`    |Boolean|true     |minimize or not widget by Esc button|
|`widgetColor`   |String |'#9ec939'|color for minimized widget backgroud color|
|`fontColor`     |String |null     |color for icon (if iconText provided). Autoselect (black/white if null)|
|`showDelayMs`   |Number |0        |ms delay to show|
|`position`      |Object |{bottom: '30px', right: '30px'}  |css top, bottom, right or left attributes for fixed position |
|`stopAutoexpand`|Boolean|false    |you can pass this prop to stop autoexpand |


### Available Hooks
onMinimized - called after widget is minimized
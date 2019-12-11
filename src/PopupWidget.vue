<template>
    <div
        id="popup-widget"
        :class="mode === 'minimized' ? 'expanded' ? 'expanded' : 'minimized' : null"
        :style="widgetPosition"
    >
        <transition name="bounce">  
            <div
                class="widget-container"
                :style="[bgColor]"
                @click="toggle()"
                v-if="mode === 'minimized'"
            >
                <div class="icon-container">
                    <img :src="iconPath" v-if="iconPath"> 
                   
                    <span class="icon" :style="textColor" v-if="!iconPath" v-html="iconText">
                    </span>
                </div>
                <div class="notification"></div>
            </div>
        </transition>

        <transition name="modal">
            <div class="modal-overlay" v-if="mode === 'expanded'">
                <div class="modal-container to-center">
                    <div class="modal-close-x" @click="toggle()">
                        <span class="close-icon">&#10005;</span>
                    </div>
                    <slot name="modal-content">
                        
                        <div class="modal-body">
                            <h1>
                                {{ title }}
                            </h1>
                            <div>
                                {{ text }}
                            </div> 
                        </div>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

// thx to user SudoPlz/ via https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
var pickTextColorBasedOnBgColorAdvanced = (bgColor, lightColor, darkColor) => {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor
    var r = parseInt(color.substring(0, 2), 16) // hexToR
    var g = parseInt(color.substring(2, 4), 16) // hexToG
    var b = parseInt(color.substring(4, 6), 16) // hexToB
    var uicolors = [r / 255, g / 255, b / 255]
    var c = uicolors.map((col) => {
    if (col <= 0.03928) {
        return col / 12.92
    }
        return Math.pow((col + 0.055) / 1.055, 2.4)
    })
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
    return (L > 0.179) ? darkColor : lightColor
}

export default {
    name: 'PopupWidget',

    data () {
        return {
           mode: null
        }
    },

    components: {
        
    },

    props: {
        defaultMode: {
            type: String,
            default: 'minimized'
        },
        text: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        iconPath: {
            type: String,
            default: null
        },
        iconText: {
            type: String,
            default: '🎁'
        },
        autoexpand: {
            type: Boolean,
            default: false
        },
        autoexpandMs: {
            type: Number,
            default: 7000
        },
        closeByEsc: {
            type: Boolean,
            default: true
        },
        widgetColor: {
            type: String,
            default: '#9ec939'
        },
        fontColor: {
            type: String,
            default: null
        },
        showDelayMs: {
            type: Number,
            default: 0
        },
        position: {
            type: Object,
            default () {
                return {
                    bottom: '30px',
                    right: '30px'
                }
            }
        },
        stopAutoexpand: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        bgColor () {
            return {
                backgroundColor: this.widgetColor
            }
        },
        textColor () {
            return {
                color: this.fontColor ? this.fontColor : pickTextColorBasedOnBgColorAdvanced(this.widgetColor, 'white', 'black')
            }
        },

        widgetPosition () {
            return {
                position: 'fixed',
                top: this.position.top ? this.position.top : null,
                bottom: this.position.bottom ? this.position.bottom : null,
                left: this.position.left ? this.position.left : null,
                right: this.position.right ? this.position.right : null
            }
        }
    },

    methods: {
        open () {
            this.mode = 'expanded'
        },

        close () {
            this.mode = 'minimized'
            this.$emit('onMinimized')
        },

        hide () {
            this.mode = null
        },

        toggle () {
            return this.mode === 'expanded' ? this.close() : this.open()
        },

        closeByKey (e) {
            if (e.keyCode === 27) {
                if (!this.closeByEsc) return
                this.close()
            }
        }
    },

    mounted () {
        window.addEventListener('keyup', this.closeByKey)
        if (this.autoexpand) {
            var msec = this.autoexpandMs + this.showDelayMs
            setTimeout(() => {
                if (!this.stopAutoexpand) this.open()
            }, msec)
        }
        if (this.showDelayMs > 0) {
            setTimeout(() => {
                this.mode = this.defaultMode
            }, this.showDelayMs)
        }
        
    },

    destroyed () {
        window.removeEventListener('keyup', this.closeByKey)
    }
}

</script>

<style scoped>
.modal-enter,
.modal-leave-to {
    opacity: 0;
}

.modal-leave-active,
.modal-enter-active {
    overflow: hidden;
    transition: all 0.1s ease;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
    transform: scale(1);
    }
}

#popup-widget {
    z-index: 9999;
}
.to-center {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.widget-container {
    border-radius: 50% 8px 50% 50%;
    box-shadow: 0 5px 4px 0 rgba(0,0,0,.26);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
}

.icon-container {
    padding: 15px;
}

.icon {
    font-size: 30px;
    line-height: 0;
}

.notification {
    background: red;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    right: -5px;
    top: -5px;
}

.modal-container {
    background: white;
    border-radius: 4px;
    max-width: 800px;
    width: 90%;
    z-index: 99999;
}

.modal-body {
    padding: 30px;
}

.modal-close-x {
    box-shadow: 1px 1px 3px grey;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    background-color: white;
    z-index: 1;
}

.close-icon {
    color: #9f9c9c;
    font-size: 18px;
    font-weight: bold;
}

.modal-body {
    text-align: center;
}

.modal-overlay {
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
}

</style>

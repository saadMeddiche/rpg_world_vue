<template>
    <div class="Loading" v-show="show">
        <div class="Text">
            <h3>Loading...</h3>
        </div>
        <div class="Circles" >
            <div class="Circle Num1"></div>
            <div class="Circle Num2"></div>
            <div class="Circle Num3"></div>
        </div>
    </div>
</template>
  
<script>

    export default{
        
        data(){
            return {
                show:false
            }
        },
        watch:{
            loading_status(){
            }
        },
        computed:{
            loading_status(){
                this.show = this.$store.state.show_loading
            }
        }
    }
</script>
<!-- css animation - loding  -->
<!-- https://www.w3schools.com/css/css3_animations.asp -->
<style lang="scss" scoped>
    
    .Loading{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 99;

        background-color: black;
        transform: translate(-50% ,-50%);
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .Text{
            color: white;
        }
        .Circles {
            display: flex;
            justify-content: center;
            align-items: center;
            
            gap: 4px;

            .Circle{

                width: 40px;
                height: 40px;

                border-radius: 50%;

                background-color: #de424d;
                animation: ellipsis 1s infinite;
            }

            //Loop in scss
            //https://sass-lang.com/documentation/at-rules/control/for
            @for $i from 1 through 3{
                .Num#{$i} {
                    animation-delay: #{$i / 10}s;
                }
            }
        }
    }
    
  // Key Frame Rule for ellipsis
  @keyframes ellipsis {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
</style>
  
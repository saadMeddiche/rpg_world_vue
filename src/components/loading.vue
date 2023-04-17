<template>
    <div class="Circles">
      <div class="Circle Num1"></div>
      <div class="Circle Num2"></div>
      <div class="Circle Num3"></div>
    </div>
</template>
  
<!-- css animation - loding  -->
<!-- https://www.w3schools.com/css/css3_animations.asp -->
<style lang="scss" scoped>
    .Circles {
        display: flex;

        justify-content: center;
        align-items: center;

        gap:4px;

        
    }
    .Circle{

        width: 8px;
        height: 8px;

        border-radius: 50%;

        background-color: #de424d;
        animation: ellipsis 10s infinite;
    }
  
    //Loop in scss
    //https://sass-lang.com/documentation/at-rules/control/for
    @for $i from 1 through 3{
        .Num#{$i} {
            animation-delay: #{$i / 10}s;
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
  
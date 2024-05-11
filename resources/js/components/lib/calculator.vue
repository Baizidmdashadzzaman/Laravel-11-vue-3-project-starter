<template>
  <div >
    <div class="calculator">
      <div class="btn display text-right" style="justify-content: right;">৳ <font style="font-family: 'Nunito';font-size: 35px;">{{current || '0'}}</font></div>
      <div @click="clear" class="btn btn-primary border " style="font-family: 'Nunito';">C</div>
      <div @click="sign" class="btn btn-label-primary border" style="font-family: 'Nunito';">+/-</div>
      <div @click="percent" class="btn btn-label-primary border " style="font-family: 'Nunito';">%</div>
      <div @click="divide" class="btn btn-primary border" style="font-family: 'Nunito';">÷</div>
      <div @click="append('7')" class="btn btn-label-primary border">7</div>
      <div @click="append('8')" class="btn btn-label-primary border">8</div>
      <div @click="append('9')" class="btn btn-label-primary border">9</div>
      <div @click="times" class="btn btn-primary border" style="font-family: 'Nunito';">x</div>
      <div @click="append('4')" class="btn btn-label-primary border">4</div>
      <div @click="append('5')" class="btn btn-label-primary border">5</div>
      <div @click="append('6')" class="btn btn-label-primary border">6</div>
      <div @click="minus" class="btn btn-primary border" style="font-family: 'Nunito';">-</div>
      <div @click="append('1')" class="btn btn-label-primary border">1</div>
      <div @click="append('2')" class="btn btn-label-primary border">2</div>
      <div @click="append('3')" class="btn btn-label-primary border">3</div>
      <div @click="add" class="btn btn-primary border" style="font-family: 'Nunito';">+</div>
      <div @click="append('0')" class="btn btn-label-primary border zero">0</div>
      <div @click="dot" class="btn btn-label-primary border" style="font-family: 'Nunito';">.</div>
      <div @click="equal" class="btn btn-primary border" style="font-family: 'Nunito';">=</div>
    </div>
  </div>
</template>

  <script>
  export default {
      name:"dashboard-layout",
      data(){
          return {
              total: 0,
              previous: null,
              current: '',
              operator: null,
              operatorClicked: false,

          }
      },
      created() {

      },
      methods:{

      clear() {
        this.current = '';
      },
      sign() {
        this.current = this.current.charAt(0) === '-' ?
          this.current.slice(1) : `-${this.current}`;
      },
      percent() {
        this.current = `${parseFloat(this.current) / 100}`;
      },
      append(number) {
        if (this.operatorClicked) {
          this.current = '';
          this.operatorClicked = false;
        }
        this.current = `${this.current}${number}`;
      },
      dot() {
        if (this.current.indexOf('.') === -1) {
          this.append('.');
        }
      },
      setPrevious() {
        this.previous = this.current;
        this.operatorClicked = true;
      },
      divide() {
        this.operator = (a, b) =>  b / a;
        this.setPrevious();
      },
      times() {
        this.operator = (a, b) => a * b;
        this.setPrevious();
      },
      minus() {
        this.operator = (a, b) => b - a;
        this.setPrevious();
      },
      add() {
        this.operator = (a, b) => a + b;
        this.setPrevious();
      },
      equal() {
        this.current = `${this.operator(
          parseFloat(this.current),
          parseFloat(this.previous)
        )}`;
        this.previous = null;
      },

      },
      mounted () {

      },
      watch: {

        }
  }
  </script>

  <style scoped>
  @media (min-width: 1200px){
  .modal-xl {
      max-width: 95%;
  }
  }
  .calculator {
    margin: 0 auto;
    width: 100%;
    font-size: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(50px, auto);
  }
  .display {
    grid-column: 1 / 5;
    background-color: #242745;
    color: white;
    font-size: 40px;
  }
  .zero {
    grid-column: 1 / 3;
  }
  .btnCal {
    background-color: #F2F2F2;
    border: 1px solid #999;
  }
  .operator {
    background-color: orange;
    color: white;
  }
  /* .layout-navbar-fixed.layout-fixed .wrapper .sidebar {
      margin-top: 0px;
  } */
  </style>

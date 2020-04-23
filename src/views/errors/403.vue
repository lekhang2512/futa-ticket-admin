<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 md4 class="error403">
          <v-card class="error403-body-con">
            <div class="error403-body-con-title">4<span class="error403-0-span"><v-icon class="error403-0-span">lock</v-icon></span><span class="error403-key-span"><i>3</i></span></div>
            <p class="error403-body-con-message">Bạn không được phép</p>
            <div class="error403-btn-con">
              <v-btn @click="goHome" style="width: 200px;">Về trang chủ</v-btn>
              <v-btn @click="backPage" color="primary" style="width: 200px;margin-left: 40px;">Về trang trước</v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: 'Error403',
  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        name: 'dashboard'
      })
    }
  }
}
</script>
<style scoped>
@keyframes error403animation {
  0% {
    transform: rotateZ(0deg);
  }
  40% {
    transform: rotateZ(-20deg);
  }
  45% {
    transform: rotateZ(-15deg);
  }
  50% {
    transform: rotateZ(-20deg);
  }
  55% {
    transform: rotateZ(-15deg);
  }
  60% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.error403-body-con {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.error403-body-con-title {
  text-align: center;
  font-size: 240px;
  font-weight: 700;
  color: #2d8cf0;
  height: 260px;
  line-height: 260px;
  margin-top: 40px;
}
.error403-body-con-title .error403-0-span {
  display: inline-block;
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 20px solid #ed3f14;
  color: #ed3f14;
  margin-right: 10px;
}
.error403-body-con-title .error403-0-span i {
  display: inline-block;
  font-size: 120px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.error403-body-con-title .error403-key-span {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 210px;
  border-radius: 50%;
  margin-right: 10px;
}
.error403-body-con-title .error403-key-span i {
  display: inline-block;
  font-size: 240px;
  position: absolute;
  left: 20px;
  transform: translate(-50%, -60%);
  transform-origin: center bottom;
  animation: error403animation 2.8s ease 0s infinite;
}
.error403-body-con-message {
  display: block;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 4px;
  color: #dddde2;
}
.error403-btn-con {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
</style>

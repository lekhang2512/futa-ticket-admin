<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 md4 class="error404">
          <v-card class="error404-body-con">
            <div class="error404-body-con-title">4<span><v-icon class="error404-0-span" style="font-size: 240px">my_location</v-icon></span>4</div>
            <p class="error404-body-con-message">Không tìm thấy trang</p>
            <div class="error404-btn-con">
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
  name: 'Error404',
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
@keyframes error404animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.error404-body-con {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.error404-body-con-title {
  text-align: center;
  font-size: 240px;
  font-weight: 700;
  color: #2d8cf0;
  height: 260px;
  line-height: 260px;
  margin-top: 40px;
}
.error404-body-con-title span {
  display: inline-block;
  color: #19be6b;
  font-size: 230px;
  animation: error404animation 3s ease 0s infinite alternate;
}
.error404-body-con-message {
  display: block;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 12px;
  color: #dddde2;
}
.error404-btn-con {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}
</style>

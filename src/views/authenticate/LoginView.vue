<template>
  <div class="d-flex login-container">
    <img
      class="d-md-flex d-none wave"
      src="../../assets/background/wave.png"
    />
    <div class="container d-flex">
      <div
        class="d-md-flex d-none col-md-6 h-100 justify-content-end align-items-center"
      >
        <img
          style="width: 500px"
          src="../../assets/content/undraw_window_shopping_re_0kbm.svg"
        />
      </div>
      <div class="col-md-6 col-12 h-100 d-flex justify-content-center">
        <div class="col-md-7 col-10 mt-3">
          <div class="d-flex justify-content-center p-3">
            <img
              class=""
              style="height: 100px"
              src="../../assets/content/avatar.svg"
            />
          </div>
          <h2
            class="title text-center d-md-block d-none"
            style="font-size: 50px"
          >
            WELCOME
          </h2>
          <form @submit.prevent="submitForm">
            <div class="d-flex input-div position-relative">
              <div
                class="col-2 d-flex justify-content-center align-items-center"
              >
                <font-awesome-icon :icon="['fas', 'user']" />
              </div>
              <div class="col-8">
                <input
                  type="text"
                  class="input-form"
                  placeholder="Tài Khoản"
                  v-model="username"
                />
              </div>
              <div
                id="error-username"
                class="position-absolute top-0 end-0 start-0"
                style="transform: translateY(-10px)"
              ></div>
            </div>
            <div class="d-flex input-div position-relative">
              <div
                class="col-2 d-flex justify-content-center align-items-center"
              >
                <font-awesome-icon :icon="['fas', 'lock']" />
              </div>
              <div class="col-8">
                <input
                  id="password"
                  type="password"
                  class="input-form"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div
                class="col-2 d-flex justify-content-center align-items-center"
                style="cursor: pointer"
                @click="togglePassword"
              >
                <font-awesome-icon :icon="['fas', 'eye']" v-if="!showPass" />
                <font-awesome-icon
                  :icon="['fas', 'eye-slash']"
                  v-if="showPass"
                />
              </div>
              <div
                id="error-password"
                class="position-absolute top-0 end-0 start-0"
                style="transform: translateY(-10px)"
              ></div>
            </div>
            <div class="btn-login">
              <button type="submit" class="btn">Login</button>
            </div>
          </form>
          <div class="d-flex justify-content-between">
            <router-link to="/register">Đăng ký</router-link>
            <router-link to="/forgot">Quên mật khẩu</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios, { HttpStatusCode } from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      token: "",
      user: {},
      errors: {},
      showPass: false,
    };
  },

  props: ["isLogin", "isAdmin", "baseUrl"],

  methods: {
    togglePassword() {
      this.showPass = !this.showPass;
      var passwordInput = document.getElementById("password");
      var currentType = passwordInput.type;
      passwordInput.type = currentType === "password" ? "text" : "password";
    },

    async submitForm() {
      this.errors = {};

      if (this.username == "") {
        this.errors.username = "Nhập tài khoản";
      }

      if (this.password == "") {
        this.errors.password = "Nhập mật khẩu";
      }

      if (Object.keys(this.errors).length === 0) {
        await this.login();
      } else {
        if (this.errors.username) {
          this.showError("error-username", this.errors.username);
        }
        if (this.errors.password) {
          this.showError("error-password", this.errors.password);
        }
        this.password = "";
      }
    },

    async login() {
      try {
        const response = await axios.post(this.baseUrl + "/auth/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data.statusCode == HttpStatusCode.NotFound) {
          this.showError("error-username", response.data.message);
          this.password = "";
        }

        if (response.data.statusCode == HttpStatusCode.BadRequest) {
          this.showError("error-password", response.data.message);
          this.password = "";
        }

        if (response.data.statusCode == HttpStatusCode.Ok) {
          this.token = response.data.message;
          localStorage.setItem("token", this.token);

          var currentURL = window.location.href;
          var baseURL = currentURL.replace("/login", "");
          window.location.replace(baseURL);
        }
      } catch (error) {
        console.error(error);
      }
    },

    showError(idHtml, messageErr) {
      const alertPlaceholder = document.getElementById(idHtml);
      if (alertPlaceholder.length != 0) {
        alertPlaceholder.innerHTML = "";
      }
      const appendAlert = (message, type) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible alert-danger" role="alert">`,
          `   <div>${message}</div>`,
          `   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
          `</div>`,
        ].join("");
        alertPlaceholder.append(wrapper);
        setTimeout(function () {
          wrapper.remove();
        }, 2000);
      };
      appendAlert(messageErr, "success");
    },

    async current() {
      try {
        const response = await axios.get(this.urlGW + "/auth/current", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.user = response.data;
        return this.user;
      } catch (error) {
        console.error(error);
      }
    },

    validPassword(password) {
      return password.length >= 6;
    },

    async checkAcountUser() {
      try {
        const response = await axios.get(
          this.urlGW + "/auth/checkusername?username=" + this.username,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // },
    // async getRandom() {
    //   try {
    //     const response = await axios.get(this.urlbe + "/api/random", {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // sendMessage() {
    //   this.$emit('message-sent', 'Hello from child');
    // }
  },

  created() {},
};
</script>

<style scoped>
.login-container {
  font-family: "KoHo", sans-serif;
  height: calc(100vh - 104px);
}

.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.input-div {
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
  font-size: 20px;
}

.input-form {
  border: none;
  width: 100%;
}

.input-form:focus {
  outline: none;
}

.btn-login {
  padding: 0 10px 10px 10px;
}

.btn-login:hover {
  opacity: 0.8;
}

.btn-login button {
  background-color: #42b983;
  color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  box-sizing: border-box;
  font-size: 20px;
}

@media (max-width: 719px) {
  .login-container {
    height: calc(100vh - 127px);
  }
}
</style>

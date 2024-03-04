<template>
  <div class="d-flex login-container">
    <img class="d-md-flex d-none wave" src="../../assets/background/wave.png" />
    <form class="row g-3 needs-validation" novalidate>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustom02" class="form-label">Last name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value="Otto"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label"
          >Username</label
        >
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">Province</label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">Choose...</option>
          <option v-for="province in provinces" :key="province">
            {{ province.ProvinceName }}
          </option>
        </select>
        <div class="invalid-feedback">Please select a valid province.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">Province</label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">Choose...</option>
          <option v-for="province in provinces" :key="province">
            {{ province.ProvinceName }}
          </option>
        </select>
        <div class="invalid-feedback">Please select a valid state.</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom05" class="form-label">Zip</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom05"
          required
        />
        <div class="invalid-feedback">Please provide a valid zip.</div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
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

      provinces: [],
    };
  },

  props: ["isLogin", "isAdmin", "baseUrl"],

  methods: {
    async getProvinces() {
      try {
        const response = await axios.get(
          this.$store.state.urlGHNProvince,
          {
            headers: {
              token: this.$store.state.tokenGHN,
            },
          }
        );
        this.provinces = response.data.data;
        return response;
      } catch (error) {
        console.error(error);
      }
    },

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

  async created() {
    this.getProvinces();
  },
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

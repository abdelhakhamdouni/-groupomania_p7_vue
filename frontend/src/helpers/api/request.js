import axios from "axios";
export const login = function  (vuem) {
    vuem.error = "";
        axios
        .post("http://localhost:8000/api/auth/login", {
            email: vuem.email,
            password: vuem.password,
        })
        .then((response) => {
            if (
                response.status === 200 &&
                response.data.token
            ) {
                vuem.$store.commit("LOG_USER", true);
                localStorage.setItem("token", response.data.token);
                vuem.$router.push({ name: "Home" });
            } else {
                vuem.error = "Votre email ou mot de passe est incorrécte";
                vuem.shwoForgetPassword = true;
            }
        })
        .catch(() => {
            vuem.error = "Votre email ou mot de passe est incorrécte";
            vuem.shwoForgetPassword = true;
        });
}

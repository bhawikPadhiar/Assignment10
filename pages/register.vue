<template>
    <v-container>
        <v-dialog v-model="alertSuc">
            <v-alert type="success" icon="$success"> User Registered</v-alert>
        </v-dialog>
        <v-dialog v-model="alertWarn">
            <v-alert type="warning" icon="$warning"> User Alredy Exist</v-alert>
        </v-dialog>
        register
        <UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true"></UserAuthForm>
    </v-container>
</template>
    
<script>

import UserAuthForm from '~/components/UserAuthForm.vue';

export default {
    middleware: 'guest',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            alertSuc: false,
            alertWarn: false

        }
    },
    components: {
        UserAuthForm
    },
    methods: {
        async registerUser(logininfo) {
            const check = await this.$axios.get(`http://localhost:8080/api?email=${logininfo.email}&password=${logininfo.password}`);
            if (check.status == 200 && check.data.length > 0) {

                this.alertWarn = true;
                setTimeout(() => (this.alertWarn = false), 2000);
            } else {
                const result = await this.$axios.post(`http://localhost:8080/api?email=${logininfo.email}&password=${logininfo.password}&name=${logininfo.name}`, {
                    email: logininfo.email,
                    password: logininfo.password,
                    name: logininfo.name
                })
                console.log(result.status)
                if (result.status == 201 && result.data.length > 0) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push("/login");
                    this.alertSuc = true;
                    setTimeout(() => (this.alertSuc = false), 2000);
                    //     }else{
                    //         this.alert=true;
                    //    setTimeout(() =>(this.alert=false), 2000);    
                    //     }

                }
            }

        }
        // mounted(){
        //     let user= localStorage.getItem('user-info');
        //     if(user)
        //     {
        //         this.$router.push('/login')
        //     }

        // }
    }
}
</script>
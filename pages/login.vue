<template>
<v-container width="auto">
    <v-dialog v-model="alert">
    <v-alert  
    type="warning"
    icon="$warning"
    
  > Wrong Credentials</v-alert>
</v-dialog>

    Login
    <UserAuthForm buttonText="Login"  :submitForm="loginUser"></UserAuthForm>

</v-container>

</template>

<script>
import UserAuthForm from '~/components/UserAuthForm.vue';


export default{
    
    data(){
        return {
            email:'',
            password:'',
            alert:false
        }
    },
   components:{
    UserAuthForm
   } ,
   methods:{
     async loginUser(logininfo){
        
        const result = await this.$axios.get(`http://localhost:8080/api?email=${logininfo.email}&password=${logininfo.password}`);
        if(result.status==200 && result.data.length>0){
            localStorage.setItem("user-info",JSON.stringify(result.data));
             this.$router.push("/DisplayTodo");
        }else{
            this.alert=true;
       setTimeout(() =>(this.alert=false), 2000);
       
            this.username="",
            this.password=""
        }
    

     }
    },

    mounted(){
        // let user= localStorage.getItem('user-info');
        // if(user)
        // {
        //     this.$router.push("/")
        // }
    
    }
}
        //    this.$auth.loginWith('local',{

        //         data:logininfo
               
        //     }).then(function(response){
        //         console.log(response,'my data');
        //     })
        
           
       

</script>
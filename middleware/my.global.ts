export default defineNuxtRouteMiddleware(async(to, from)=>{
    if(to.path == '/'){
        const {data, error} = await useFetch('/api/search_session')
        if(data.value){
            if(data.value.statusCode ==200){
                userStore().userLogin()
                userStore().setUserName(data.value.message)
            }else if(data.value.statusCode == 201){
                userStore().userLogout()
            }else{
                console.log(data.value.statusCode, data.value.message)
            }
        }
    }
})
jQuery(document).ready(function ($) {

    ///////////////////// Vue Modal Component //////////////// v-on:click="getmycity(mycountry.country_name)"
    let mymodal = Vue.component('my-api-modal', {
        template: `
            <div>
                <button class="btn btn-sm p-1 btn-outline-dark right" data-bs-toggle="modal" :data-bs-target="'#'+id" v-on:click="my_api_getmycity(mycountry)">Show Cities
                </button>

                <div class="modal mt-4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                     aria-hidden="true" :id="id">
                    <div class="modal-dialog " role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">{{mycountry}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"></span>
                                </button>
                            </div>
                            <div class="modal-body">
                           <!--     <slot :cities="cities"></slot>
                                <slot></slot>-->
                                <ul>
                                    <li v-for="(city) in cities" >
                                        <button class="btn btn-outline-danger btn-sm p-1" v-on:click="my_api_deleteCity(mycountry,city.city_name)">Delete</button>  {{ mycountry }} - {{ city.city_name }} - ({{ city.lat }})  ({{ city.lng }}) 
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-footer">
<!--                                <button type="button" class="btn btn-primary">Save changes</button>-->
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        props: ['id', 'mycountry'],
        data() {
            return {
                cities: {},
                message: '',
                cityindex:null,

            }
        },
        methods: {
            my_api_getmycity(event) {

                let mycountrydata = new FormData();
                let self = this;
                mycountrydata.append('action', 'my_api_getmycity');
                mycountrydata.append('getMyCity', event);
                axios.post(myAjax.ajaxurl, mycountrydata)
                    .then(  function (response) {
                        self.cities = response.data;

                        //this.$nextTick(()=>{});
                    })
                    .catch(function (error) {
                        console.table(error.response);
                    });
            },
            my_api_deleteCity(country,city){

                Swal.fire({
                    title: 'Are you sure to delete '+ city +' ?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {

                        let self = this;
                        let mydata = new FormData();
                        mydata.append('action','my_api_deleteCity');
                        mydata.append('country',country);
                        mydata.append('city',city);
                        axios.post(myAjax.ajaxurl,mydata)
                            .then((response)=>{

                                if(response.data==1){
                                    //self.cities.splice(self.cities.indexOf(country), 1);
                                    $('#'+self.id).modal('hide');
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Deleted !',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }

                            })
                            .catch((error)=>{console.error(error.response)})
                    }
                });

            },
        }
    });

    //////////////// VUE ADMIN /////////////////

    let adminvue = new Vue({
        el: '#my_api_admin_app',
        data: {
            oghat_update_day_dif: null,
            message: null,
            allcountry: {},
            new_country: null,
            new_city: null,
            lat: null,
            lng: null,
            alldata:{},
            apikey:null,
            activeLang:"en",
        },
        component:{

        },
        async created() {
            this.getmycountry();
        },
        methods: {
            my_api_getmycity(event) {

                let mycountrydata = new FormData();
                let self = this;
                mycountrydata.append('action', 'my_api_getmycity');
                mycountrydata.append('getMyCity', event);
                axios.post(myAjax.ajaxurl, mycountrydata)
                    .then(  function (response) {
                        self.cities = response.data;

                        //this.$nextTick(()=>{});
                    })
                    .catch(function (error) {
                        console.table(error.response);
                    });
            },

            saveCountry: () => {
                // Send a POST request
                let self = this;
                if(adminvue.new_country==null || adminvue.new_city==null ||adminvue.lat==null||adminvue.lng==null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'All fields must fill !',
                        showConfirmButton: false,
                        timer: 1500
                    });


                    return;
                }
                let mydata = new FormData();
                mydata.append('action', 'my_api_save_country');
                mydata.append('new_country', adminvue.new_country);
                mydata.append('new_city', adminvue.new_city);
                mydata.append('lat', adminvue.lat);
                mydata.append('lng', adminvue.lng);
                axios({
                    method: 'post',
                    url: myAjax.ajaxurl,
                    data: mydata
                }).then((res) => {
                    console.log(res.data)
                    if (res.data == 0) {

                        adminvue.lat=null;
                        adminvue.lng=null;
                        adminvue.new_country=null;
                        adminvue.new_city=null;

                        Swal.fire({
                            position: 'top-end',
                            icon: 'info',
                            title: 'Updated Successfully !',
                            showConfirmButton: false,
                            timer: 2500
                        });

                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Added Successfully !',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        adminvue.message = null;
                    }
                })
                    .catch((res) => {
                        swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: res.data,
                            showConfirmButton: false,
                            timer: 1500
                        });

                    });
            },
            getmycountry: () => {
                let self = this;
                let data = new FormData();
                data.append('action', 'my_api_all_country');
                axios.post(myAjax.ajaxurl, data)
                    .then(function (response) {

                        adminvue.allcountry = response.data;
                        //console.log(adminvue.allcountry);
                        //this.$nextTick(()=>{console.log('allcountry');});
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },
            show_all_city: () => {
                let mydata = new FormData();
                mydata.append('action','my_api_show_all_city');

                axios.post(myAjax.ajaxurl,mydata)
                    .then((response)=>{
                        //console.log(response.data);
                        adminvue.$set(adminvue,'alldata',response.data);
                        //self.all_data = response.data;
                    })
                    .catch((error)=>{
                        console.log(error)});
            },
            deleteCity(country,city){

                Swal.fire({
                    title: 'Are you sure to delete '+ city +' ?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {

                        let self = this;
                        let mydata = new FormData();
                        mydata.append('action','my_api_deletecity');
                        mydata.append('country',country);
                        mydata.append('city',city);
                        axios.post(myAjax.ajaxurl,mydata)
                            .then((response)=>{

                                if(response.data==1){
                                    //self.cities.splice(self.cities.indexOf(country), 1);
                                    $('#'+self.id).modal('hide');
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Deleted !',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }

                            })
                            .catch((error)=>{console.error(error.response)})
                    }
                });

            },

        }
    });

});

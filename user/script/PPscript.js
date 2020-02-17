const vm = new Vue({
  el: '#myID',
  data: {
    name: "",
    age: "",
    gender: "Man",
  },
  methods: {
    profileDone: function(){
      let namn = this.name;
      let ålder = this.age;
      if(namn.length > 0 && ålder.length > 0){
      let kön = this.gender;
      let profile = [namn,ålder,kön];
      for(let i = 0; i<3; i++){
        console.log(profile[i]);
      }
      window.location='http://www.google.com';
    } else {
      alert("Vänligen fyll i alla rutor");
    }
    }
  }
})

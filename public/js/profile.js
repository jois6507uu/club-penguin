const vm = new Vue({
  el: '#profileID',
  data: {
    name: "",
    age: "",
    gender: "Man",
  },
  methods: {
    profileDone: function(){
      if(confirm("Är du nöjd med dina svar?"))
      {
        let namn = this.name;
        let ålder = this.age;
        if(namn.length > 0 && ålder > 0){
        let kön = this.gender;
        let profile = [namn,ålder,kön];
        for(let i = 0; i<3; i++){
          console.log(profile[i]);
        }
        window.location.href = 'http://192.168.43.40:3000/user/questions';
      } else {
        alert("Vänligen fyll i alla rutor");
      }
      }

    }
  }
})

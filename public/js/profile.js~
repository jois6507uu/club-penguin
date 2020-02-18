const vm = new Vue({
  el: '#profileID',
  data: {
    name: "",
    age: "",
    gender: "Man",
  },
  methods: {
    profileDone: function(){
      let namn = this.name;
      localStorage.setItem("namn", namn);
      let ålder = this.age;
      localStorage.setItem("ålder", ålder);
      if(namn.length > 0 && ålder > 0){
      let kön = this.gender;
      localStorage.setItem("kön", kön);
      let profile = [namn,ålder,kön];
      for(let i = 0; i<3; i++){
        console.log(profile[i]);
      }
      window.location='questions.html';
    } else {
      alert("Vänligen fyll i alla rutor");
    }
    }
  }
})

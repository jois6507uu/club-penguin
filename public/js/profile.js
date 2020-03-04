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
            localStorage.setItem("name", namn);
            localStorage.setItem("age", ålder);
            localStorage.setItem("gender", kön);
        window.location.href = 'http://localhost:3000/user/questions';
      } else {
        alert("Vänligen fyll i alla rutor");
      }
      }

    }
  }
})

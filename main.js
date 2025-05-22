// class Anomal{
//     constructor(name,type){
//         this.name=name
//         this.type=type
//     }
//     move(){
//         return `${this.name} is moving`
//     }
// }

// class Car extends Anomal{
//     constructor(name,FuelType){
//         super(name,"Car")
//         this.FuelType=FuelType
//     }
//     drive(){
//         return `${this.name} is Driving on ${this.FuelType} foul`
//     }
// }
// const myCar=new Car("My car","blue")

// console.log(myCar.move());
// console.log(myCar.drive());

// class Bonc{
//     #balance
//     constructor(name){
//         this.name=name
//         this.#balance=100;
//     }
//     get(){
//         return this.#balance
//     }
// }

// let SobirDC=new Bonc("Sobir")
// console.log(SobirDC.get());

class Todolist {
  constructor() {
    this.API = "http://localhost:3000/data";
    this.box = document.querySelector(".box");
    this.AddUser = document.querySelector(".AddUser");
    this.Adddialog = document.querySelector(".Adddialog");
    this.Addform=document.querySelector(".Addform")
    this.Editdialog = document.querySelector(".Editdialog");
    this.Editform = document.querySelector(".Editform");
    
    this.btx = document.querySelector(".btx");
    this.btx1 = document.querySelector(".btx1");
    this.idx=null

    this.btx1.onclick=()=>{
      this.Editdialog.close()
    }
    this.Editform.onsubmit = async (event) => {
      event.preventDefault()
      let newUsers = {
        name: this.Editform["Editname"].value,
        lorem: this.Editform  ["EditLorem"].value,
        status: this.Editform["Editselect"].value == "active" ? true : false,
      };
      try {
        await fetch(`${this.API}/${this.idx}`,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(newUsers)
        })
        this.get()
        this.Editdialog.close()
      } catch (error) {
        
      }
    };

    this.AddUser.onclick = () => {
      this.Adddialog.showModal();
    };
    this.btx.onclick=()=>{
      this.Adddialog.close()
    }
    this.Addform.onsubmit = async (event) => {
      event.preventDefault()
      let newUser = {
        name: this. Addform["Addname"].value,
        lorem: this.Addform["AddLorem"].value,
        status: this.Addform["Addselect"].value == "active" ? true : false,
      };
      try {
        let respons = await fetch(this.API, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
        this.get();
        this.Adddialog.close();
      } catch (error) {}
    };
    this.getUser();
  }
  async getUser() {
    try {
      let respons = await fetch(this.API);
      let data = await respons.json();
      this.get(data);
    } catch (error) {}
  }

  async Delet(id) {
    try {
      let respons = await fetch(`${this.API}/${id}`, {
        method: "DELETE",
      });
      this.get();
    } catch (error) {}
  }

  async ChecUser(el){
    let Checout={
        ...el,
        status:!el.status
    }
    try {
        await fetch(`${this.API}/${el.id}`,{
            method:"PUT",
            headers: { "Content-type": "application/json" },
          body: JSON.stringify(Checout),
        })
         this.getUser()
    } catch (error) {
        console.error(error);
        
    }
  }

  get(data) {
    this.box.innerHTML = "";
    data.forEach((el) => {
      let div = document.createElement("div");
      div.classList.add("cardAll");
      let h1 = document.createElement("h1");
      h1.innerHTML = el.name;
      h1.style.textDecoration = el.status ? "none" : "line-through";

      let plorem = document.createElement("p");
      plorem.innerHTML = el.lorem;

      let pStatus = document.createElement("p");
      pStatus.innerHTML = el.status?"Active":"Inactive"

      let btnDelet = document.createElement("button");
      btnDelet.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;
      btnDelet.classList.add("btnDelet")
      btnDelet.onclick = () => {
        this.Delet(el.id);
      };

      let btnEdit = document.createElement("button");
      btnEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
`;  
      btnEdit.classList.add("btnEdit")
      btnEdit.onclick = () => {
        this.Editdialog.showModal();
        this.Editform["Editname"].value = el.name;
        this.Editform["EditLorem"].value = el.lorem;
        this.Editform["Editselect"].value = el.status ? "active" : "inactive";
        this.idx=el.id
      };

      let chec=document.createElement("input")
      chec.type="checkbox"
      chec.checked=el.status
      chec.onclick=()=>{
        this.ChecUser(el)
      }

      div.append(h1, plorem,pStatus,btnEdit,btnDelet,chec);
      this.box.append(div);
    });
  }
}
new Todolist();


const api ="https://660cb57d3a0766e85dbe7ef3.mockapi.io/student";

const studentdata = document.getElementById("student-data");
const studentform = document.getElementById("form-data");
let editid;

async function fetchstudent(id){
    try {
        const res = await fetch(`${api}/${id}`, {
          method:"GET",
        });
        const data = await res.json();
        console.log(data);
        mapstudentdata(data);
    } catch (error) {
        console.log(error);
    }
}

//post method
 async function addnewdata(payload){
    try {
        const res = await fetch(api,{
            method : "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        createstudentcard(data);
    }catch(error){
        console.log(error);
    }
 }

 async function editdata(payload,id){
    try {
        const res = await fetch(`${api}/${id}`,{
            method: "PUT",
            body: JSON.stringify(payload),
            headers:{
            "Content-Type": "application/json",
            },
        });
        const data = await res.json();
      if(data){
        location.reload();
      }
    } catch (error) {
        console.log(error);
    }
 }

 async function deletdata(id,parent){
    try {
        const res = await fetch(`${api}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
            },
        });
      const data = await res.json();
    
      if(data){
        parent.remove();
      }else{
        console.log("error");
      }

     } catch (error) {
        console.log(error);
    }
}
fetchstudent("");
//card
function createstudentcard(student){
    const mainDiv = document.createElement("div");
    mainDiv.className ="card"
    mainDiv.innerHTML +=`
    <h1>${student.name}</h1>
    <p>Batch : <span id="batch-value">${student.batch}</span></p>
    <p>Age : <span id="age-value">${student.age}</span></p>
    <div class="action-btn-group">
    <button data-id=${student.id} id="edit-btn" class="btn">Edit</buton>
    <button data-id=${student.id} id="delete-btn" class="btn">Delete</button>
    </div>
    `;
    studentdata.append(mainDiv);
}
//form
    studentform.innerHTML +=`
    <form>
        <h2>Student Form</h2>
         <input type="text"
         name="name"
          required 
          value=""
          placeholder="Enter Student Name"
          class="input-text"
          id="input-name"/><br>

           <input type="text"
          name="batch"
          required
          value=""
          placeholder="Enter Student Batch"
          class="input-text"
          id="input-batch"/><br>

          <input type="number"
         name="age"
          required 
          value=""
          placeholder="Enter Student Age"
          class="input-text"
          id="input-age"/><br>
          <button type="submit" id="add-btn" class="btn">Add Student</button>
          <button type="submit" id ="update-btn" class="btn">Update student</button>
        </form>
    `;
    const input_name = document.querySelector("#input-name");
    const input_batch = document.querySelector("#input-batch");
    const input_age =document.querySelector("#input-age");
    const updatebtn = document.querySelector("#update-btn");
    const addbtn = document.querySelector("#add-btn");
    updatebtn.style.display = "none";


function mapstudentdata(student){
    student.map((value)=>{
        createstudentcard(value);
  });
}
//fetchstudent("");
//addnewdata(dummydata);
//editdata(changename,"3");
//deletdata();


 function clearform(){
    input_name.value ="";
     input_batch.value="";
     input_age.value="";
 }
function getuserInput(){
    return { 
        name: input_name.value,
        batch:input_batch.value,
        age : input_age.value,
    };
}

function populateform(parentNode){
   input_name.value = parentNode.querySelector("h1").innerText;
   input_batch.value = parentNode.querySelector("#batch-value").innerText;
   input_age.value = parentNode.querySelector("#age-value").innerText;
   addbtn.style.display ="none";
   updatebtn.style.display ="block";
}

studentform.addEventListener("click" ,(ele) => {
ele.preventDefault();
if(ele.target.id == "add-btn"){
const payload = getuserInput();
console.log(payload)
addnewdata(payload);
clearform();
}
if(ele.target.id == "update-btn"){
  const payload = getuserInput();
  editdata(payload,editid);
}
});

studentdata.addEventListener("click",(e)=>{
    const id = e.target.dataset.id;
    const parentNode = e.target.parentNode.parentNode;
    if(e.target.id == "delete-btn"){
      deletdata(id,parentNode);
    }
    if(e.target.id == "edit-btn"){
       populateform(parentNode);
       editid = id;
    }
});
